import { getConnection, sql } from "../database/connection.js";

/**
 * Middleware to protect users from billing during free trial
 * Addresses issue: "porque me cobraron 10 dolares si es una prueba gratuita?"
 */
export const billingProtection = async (req, res, next) => {
  try {
    // Only check billing protection for authenticated users
    if (!req.session.user || !req.session.user.id_usuario) {
      return next();
    }

    const pool = await getConnection();
    
    // Check user's trial and billing status
    const result = await pool
      .request()
      .input("id_usuario", sql.Int, req.session.user.id_usuario)
      .execute("CheckTrialStatus");

    const userStatus = result.recordset[0];
    
    // Update session with current trial status
    req.session.user = { ...req.session.user, ...userStatus };
    
    // Log any billing protection activity
    if (userStatus.billing_protected) {
      console.log(`BILLING PROTECTION ACTIVE: User ${userStatus.id_usuario} (${userStatus.nombre}) is protected from charges. Trial status: ${userStatus.subscription_status}`);
    }

    // Add trial info to response locals for use in views
    res.locals.trialInfo = {
      isProtected: userStatus.billing_protected,
      daysRemaining: userStatus.days_remaining,
      statusMessage: userStatus.status_message,
      subscriptionStatus: userStatus.subscription_status
    };

    next();
    
  } catch (error) {
    console.error("Error in billing protection middleware:", error);
    // Don't block the request, but log the error
    next();
  }
};

/**
 * Function to validate if a billing operation should be allowed
 * Returns false if user is in trial period or protected
 */
export const validateBilling = async (userId, amount) => {
  try {
    const pool = await getConnection();
    
    const result = await pool
      .request()
      .input("id_usuario", sql.Int, userId)
      .input("amount", sql.Decimal(10, 2), amount)
      .execute("ValidateBillingProtection");
      
    const validation = result.recordset[0];
    
    if (!validation.billing_allowed) {
      console.warn(`BILLING BLOCKED: ${validation.message} User: ${userId}, Amount: $${amount}`);
    }
    
    return validation;
    
  } catch (error) {
    console.error("Error validating billing:", error);
    // Default to blocking billing if there's an error
    return {
      billing_allowed: false,
      message: "Billing validation failed - blocking for safety",
      attempted_amount: amount
    };
  }
};

/**
 * Express route handler to check billing status (for API endpoints)
 */
export const checkBillingStatus = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id_usuario) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const validation = await validateBilling(req.session.user.id_usuario, req.body.amount || 0);
    
    res.json({
      success: true,
      billingAllowed: validation.billing_allowed,
      message: validation.message,
      userStatus: {
        subscriptionStatus: validation.subscription_status,
        daysRemaining: validation.days_remaining
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: "Error checking billing status",
      message: error.message 
    });
  }
};
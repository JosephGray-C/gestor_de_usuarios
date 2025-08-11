import { Router } from "express";
import { checkBillingStatus } from "../middlewares/billingProtection.js";

const router = Router();

// API endpoint to check billing status
router.post("/check-billing", checkBillingStatus);

// Route to display billing information page
router.get("/billing", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    return res.render("billing", {
      usuario: req.session.user,
      msg: req.query.msg || null
    });
    
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;
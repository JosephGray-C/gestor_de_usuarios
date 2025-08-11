-- Database migrations for trial management system
-- Addressing the issue: "porque me cobraron 10 dolares si es una prueba gratuita?"

-- Add trial management columns to users table
-- Assuming the users table exists (based on InsertarUsuario procedure)
ALTER TABLE usuarios 
ADD 
    trial_start_date DATETIME2 DEFAULT GETDATE(),
    trial_end_date DATETIME2 DEFAULT DATEADD(DAY, 30, GETDATE()),
    is_trial_active BIT DEFAULT 1,
    trial_expired BIT DEFAULT 0,
    billing_protected BIT DEFAULT 1,
    subscription_status VARCHAR(50) DEFAULT 'free_trial',
    last_billing_date DATETIME2 NULL,
    billing_amount DECIMAL(10,2) DEFAULT 0.00;

-- Create or update the InsertarUsuario procedure to include trial setup
IF OBJECT_ID('InsertarUsuario', 'P') IS NOT NULL
    DROP PROCEDURE InsertarUsuario;
GO

CREATE PROCEDURE InsertarUsuario
    @nombre NVARCHAR(100),
    @edad INT,
    @identificacion NVARCHAR(50),
    @contrasenia NVARCHAR(255),
    @correo NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @trial_end DATETIME2 = DATEADD(DAY, 30, GETDATE());
    
    INSERT INTO usuarios (
        nombre, 
        edad, 
        identificacion, 
        contrasenia, 
        correo, 
        id_rol,
        trial_start_date,
        trial_end_date,
        is_trial_active,
        trial_expired,
        billing_protected,
        subscription_status,
        billing_amount
    )
    VALUES (
        @nombre, 
        @edad, 
        @identificacion, 
        @contrasenia, 
        @correo, 
        3, -- Default to employee role
        GETDATE(),
        @trial_end,
        1, -- Trial is active
        0, -- Trial not expired
        1, -- Billing protected during trial
        'free_trial',
        0.00
    );
    
    -- Return the created user with trial information
    SELECT 
        id_usuario,
        nombre,
        edad,
        identificacion,
        correo,
        id_rol,
        trial_start_date,
        trial_end_date,
        is_trial_active,
        trial_expired,
        billing_protected,
        subscription_status,
        DATEDIFF(DAY, GETDATE(), trial_end_date) as days_remaining
    FROM usuarios 
    WHERE id_usuario = SCOPE_IDENTITY();
END;
GO

-- Create procedure to check trial status
CREATE PROCEDURE CheckTrialStatus
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @trial_end DATETIME2;
    DECLARE @is_expired BIT = 0;
    
    SELECT @trial_end = trial_end_date 
    FROM usuarios 
    WHERE id_usuario = @id_usuario;
    
    IF @trial_end < GETDATE()
    BEGIN
        SET @is_expired = 1;
        
        -- Update trial status if expired
        UPDATE usuarios 
        SET 
            is_trial_active = 0,
            trial_expired = 1,
            billing_protected = 0
        WHERE id_usuario = @id_usuario;
    END
    
    -- Return updated status
    SELECT 
        id_usuario,
        nombre,
        trial_start_date,
        trial_end_date,
        is_trial_active,
        trial_expired,
        billing_protected,
        subscription_status,
        DATEDIFF(DAY, GETDATE(), trial_end_date) as days_remaining,
        CASE 
            WHEN billing_protected = 1 THEN 'Protected from charges'
            WHEN trial_expired = 1 THEN 'Trial expired - Upgrade required'
            ELSE 'Active trial'
        END as status_message
    FROM usuarios 
    WHERE id_usuario = @id_usuario;
END;
GO

-- Create procedure to prevent billing during trial
CREATE PROCEDURE ValidateBillingProtection
    @id_usuario INT,
    @amount DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @billing_protected BIT;
    DECLARE @subscription_status VARCHAR(50);
    
    SELECT 
        @billing_protected = billing_protected,
        @subscription_status = subscription_status
    FROM usuarios 
    WHERE id_usuario = @id_usuario;
    
    IF @billing_protected = 1 OR @subscription_status = 'free_trial'
    BEGIN
        -- Prevent billing and log attempt
        SELECT 
            0 as billing_allowed,
            'BILLING BLOCKED: User is in free trial period. No charges permitted.' as message,
            @amount as attempted_amount,
            subscription_status,
            DATEDIFF(DAY, GETDATE(), trial_end_date) as days_remaining
        FROM usuarios 
        WHERE id_usuario = @id_usuario;
    END
    ELSE
    BEGIN
        -- Allow billing for paid users
        SELECT 
            1 as billing_allowed,
            'Billing authorized for paid subscriber' as message,
            @amount as authorized_amount,
            subscription_status,
            0 as days_remaining
        FROM usuarios 
        WHERE id_usuario = @id_usuario;
    END
END;
GO

-- Update Perfil procedure to include trial information
IF OBJECT_ID('Perfil', 'P') IS NOT NULL
    DROP PROCEDURE Perfil;
GO

CREATE PROCEDURE Perfil
    @id_usuario INT
AS
BEGIN
    SET NOCOUNT ON;
    
    -- First check and update trial status
    EXEC CheckTrialStatus @id_usuario;
    
    -- Return complete profile with trial information
    SELECT 
        u.id_usuario,
        u.nombre,
        u.edad,
        u.identificacion,
        u.correo,
        u.id_rol,
        r.nombre as nombre_rol,
        u.trial_start_date,
        u.trial_end_date,
        u.is_trial_active,
        u.trial_expired,
        u.billing_protected,
        u.subscription_status,
        DATEDIFF(DAY, GETDATE(), u.trial_end_date) as days_remaining,
        CASE 
            WHEN u.billing_protected = 1 THEN 'Su cuenta está protegida contra cargos durante el período de prueba gratuita'
            WHEN u.trial_expired = 1 THEN 'Su período de prueba ha expirado. Actualice para continuar'
            ELSE 'Período de prueba activo'
        END as trial_status_message
    FROM usuarios u
    LEFT JOIN Vista_Roles r ON u.id_rol = r.id_rol
    WHERE u.id_usuario = @id_usuario;
END;
GO
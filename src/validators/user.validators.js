import { body } from 'express-validator';

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .bail()
            .isLowercase()
            .withMessage("Username must be lowercase")
            .bail()
            .isLength({ min: 3 })
            .withMessage("Username must be at lease 3 characters long"),
        body("fullName")
            .trim()
            .notEmpty()
            .withMessage("Full name is required"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ];
};

const userLoginValidator = () => {
    return [
        body("username")
            .optional(),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("role")
            .trim()
            .notEmpty()
            .withMessage("Role is required")
    ];
};

export {
    userRegisterValidator,
    userLoginValidator,
};
import { body } from "express-validator"

const contactFormValidator = () => {
    return [
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("First name is required"),
        body("lastName")
            .trim(),
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .bail()
            .isEmail()
            .withMessage("Invalid email address"),
        body("message")
            .trim()
            .notEmpty()
            .withMessage("Message is required")
    ]
}

export {
    contactFormValidator
}
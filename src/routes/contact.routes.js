import express from 'express';
import { contactFormValidator } from '../validators/contact.validators.js';
import { validate } from '../validators/validate.js';
import { contactForm } from "../controllers/contact.controller.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use((req, res, next) => {
    if (req.header('Authorization')) {
        verifyJWT(req, res, next);
    } else {
        next();
    }
});

router.route("/")
    .post(contactFormValidator(), validate, contactForm);

export default router;
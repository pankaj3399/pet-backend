import { Router } from "express";
import {
    loginUser,
    registerUser,
    getCurrentUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    userLoginValidator,
    userRegisterValidator,
} from "../validators/user.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.route("/register").post(
    userRegisterValidator(),
    validate,
    registerUser
);
router.route("/login").post(userLoginValidator(), validate, loginUser);


//secure routes
router.route("/me").get(verifyJWT, getCurrentUser);

export default router;
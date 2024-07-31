import express from "express";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";
import {
    addPet,
    removePet,
    updatePet
} from "../controllers/pet.controller.js";
import { addPetValidator, deletePetValidator, updatePetValidator } from "../validators/pet.validators.js";
import { validate } from "../validators/validate.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.use(verifyJWT, verifyAdmin);

router.route("/pet")
    .post(upload.single("image"), addPetValidator(), validate, addPet);

router.route("/pet/:petId")
    .put(upload.single("image"), updatePetValidator(), validate, updatePet)
    .delete(deletePetValidator(), validate, removePet);

export default router;
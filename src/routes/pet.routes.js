import express from "express";
import { petDetails, allPetDetails } from "../controllers/pet.controller.js";

const router = express.Router();

router.route("/:petId")
    .get(petDetails);

router.route("/all")
    .post(allPetDetails)

export default router;
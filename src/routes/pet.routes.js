import express from "express";
import { petDetails } from "../controllers/pet.controller.js";

const router = express.Router();

router.route("/:petId")
    .get(petDetails);

export default router;
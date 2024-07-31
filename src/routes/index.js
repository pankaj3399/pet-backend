import express from "express";
import userRoutes from "./user.routes.js";
import adminRoutes from "./admin.routes.js";
import petRoutes from "./pet.routes.js";
import contactRoutes from "./contact.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/pet", petRoutes);
router.use("/contact", contactRoutes);

export default router;
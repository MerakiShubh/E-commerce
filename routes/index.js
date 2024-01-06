import express from "express";
import { registerController } from "../controllers/auth";
const router = express();

router.post("/register", registerController.register);

export default router;

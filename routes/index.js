import express from "express";
import { registerController } from "../controllers";
const router = express();

router.post("/register", registerController.register);

export default router;

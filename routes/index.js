import express from "express";
import { registerController, loginController } from "../controllers";
const router = express();

router.post("/register", registerController.register);
router.post("/login", loginController.login);

export default router;

import express from "express";
import registerController from "../controllers/registerController";
const router = express();

router.post("/register", registerController.register);

export default router;

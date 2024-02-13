import express from "express";
import {
  registerController,
  loginController,
  userController,
  refreshController,
  productController,
} from "../controllers";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
const router = express();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

router.post("/products", [auth, admin], productController.store);
router.put("/product/:id", [auth, admin], productController.update);
router.put("/delete/:id", [auth, admin], productController.destroy);

export default router;

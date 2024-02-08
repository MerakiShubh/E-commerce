import { product } from "../models";
import multer from "multer";
import path from "path";
import CustomeErrorHandler from "../services/CustomeErrorHandler";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()} - ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
}).single("image"); //5mb

const productController = {
  async store(req, res, next) {
    //Multipart form data

    handleMultipartData(req, res, (err) => {
      if (err) {
        return next(CustomeErrorHandler.serverError(err.message));
      }
      const filePath = req.file.path;
      res.json({});
    });
  },
};

export default productController;

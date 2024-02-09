import { product } from "../models";
import multer from "multer";
import path from "path";
import fs from "fs";
import Joi from "joi";
import CustomeErrorHandler from "../services/CustomeErrorHandler";
import { compareSync } from "bcrypt";

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

    handleMultipartData(req, res, async (err) => {
      if (err) {
        return next(CustomeErrorHandler.serverError(err.message));
      }
      //jo bhi file upload hoo rhi hai uska path hame req pr mil rha hai becasue of multer aur ye path yha is project me us file ka hoga
      const filePath = req.file.path;

      const productSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().required(),
      });

      const { error } = productSchema.validate(req.body);
      if (error) {
        //if validation gets failed then delete uploaded image
        fs.unlink(`${appRoot}/${filePath}`, (err) => {
          if (err) {
            return next(CustomeErrorHandler.serverError(err.message));
            // console.log(err.message);
          }
        });
        return next(error);
      }

      //saving product details to db

      const { name, price, size } = req.body;

      let document;

      try {
        document = await product.create({
          name,
          price,
          size,
          image: filePath,
        });
      } catch (error) {
        return next(error);
      }

      res.json(document);
    });
  },
};

export default productController;

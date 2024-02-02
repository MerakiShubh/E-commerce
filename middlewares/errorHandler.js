import { DEBUG_MODE } from "../config";
import { ValidationError } from "joi";
import CustomeErrorHandler from "../services/CustomeErrorHandler";
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    messgae: "Internal Server Error",

    //sending original server error to client is not safe so apply a security check

    ...(DEBUG_MODE === "true" && { originalError: err.messgae }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      messgae: err.message,
    };
  }
  if (err instanceof CustomeErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }
  return res.status(statusCode).json(data);
};

export default errorHandler;
//Every middleware we have to register in server.js file

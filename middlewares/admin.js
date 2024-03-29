import { User } from "../models";
import CustomeErrorHandler from "../services/CustomeErrorHandler";

const admin = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (user.role === "admin") {
      next();
    } else {
      return next(CustomeErrorHandler.unAuthorized("Only admin can access!!!"));
    }
  } catch (error) {
    return next(CustomeErrorHandler.serverError());
  }
};

export default admin;

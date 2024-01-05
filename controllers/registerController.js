import Joi from "joi";
import CustomeErrorHandler from "../services/CustomeErrorHandler";
const registerController = {
  async register(req, res, next) {
    //validate request

    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      repeat_password: Joi.ref("password"),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      //For errorhandling passing error to a middleware in errorHandling.js file
      //middlware can't catch all type of error specially async function error we have to do it like this
      return next(error);
    }
    res.json({ message: "Hello from express" });

    //check if user is the database already

    try {
      const exist = await User.exists({ email: req.body.email });
      if (exist) {
        return next(
          CustomeErrorHandler.alreadyExist("This email is already exists")
        );
      }
    } catch (err) {
      return next(err);
    }
  },
};

export default registerController;

import Joi from "joi";
import { User } from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService.js";

import CustomeErrorHandler from "../../services/CustomeErrorHandler.js";
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

    // check if user is in the database

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

    const { name, email, password } = req.body;
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    //prepare the model
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    //save user to db
    let access_token;
    try {
      const result = await user.save();
      console.log(result);

      //Token
      access_token = JwtService.sign({ _id: result._id, role: result.role });
    } catch (error) {
      return next(error);
    }

    res.json({ access_token: access_token });
  },
};

export default registerController;

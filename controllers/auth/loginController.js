import Joi from "joi";
import { RefreshToken, User } from "../../models";
import bcrypt from "bcrypt";
import CustomeErrorHandler from "../../services/CustomeErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";
const loginController = {
  async login(req, res, next) {
    //validation request
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });

    //errorhandling
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    //checking wether user credentials is in db or not

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return next(
          CustomeErrorHandler.wrongCredentials(
            "Username or password is wrong!!"
          )
        );
      }
      //compare the password
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return next(
          CustomeErrorHandler.wrongCredentials(
            "Username or password is wrong!!"
          )
        );
      }

      //if password is matched then token generation
      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_SECRET
      );

      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req, res, next) {
    //validation request
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    //errorhandling
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      await RefreshToken.deleteOne({ token: req.body.refresh_token });
    } catch (error) {
      return next(new Error("Something went wrong in database"));
    }
    res.json({ status: 1 });
  },
};

export default loginController;

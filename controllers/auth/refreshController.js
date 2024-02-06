import Joi from "joi";
import { RefreshToken, User } from "../../models";
import CustomeErrorHandler from "../../services/CustomeErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";
const refreshController = {
  async refresh(req, res, next) {
    //validation request
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().required(),
    });

    //errorhandling
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    // verifing refresh token in database

    let refreshtoken;

    try {
      refreshtoken = await RefreshToken.findOne({
        token: req.body.refresh_token,
      });
      if (!refreshtoken) {
        return next(CustomeErrorHandler.unAuthorized("Invalid refresh token"));
      }

      let userId;

      try {
        const { _id } = await JwtService.verify(
          refreshtoken.token,
          REFRESH_SECRET
        );
        userId = _id;
      } catch (error) {
        return next(CustomeErrorHandler.unAuthorized("Invalid refresh token"));
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        return next(CustomeErrorHandler.unAuthorized("No user found"));
      }

      //regenerating access token and refresh token

      const access_token = JwtService.sign({ _id: user._id, role: user.role });
      const refresh_token = JwtService.sign(
        { _id: user._id, role: user.role },
        "1y",
        REFRESH_SECRET
      );

      await RefreshToken.create({ token: refresh_token });
      res.json({ access_token, refresh_token });
    } catch (err) {
      return next(new Error("Something went wrong" + err.message));
    }
  },
};

export default refreshController;

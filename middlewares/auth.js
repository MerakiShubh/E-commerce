import CustomeErrorHandler from "../services/CustomeErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req, res, next) => {
  //getting access token from client from request header
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomeErrorHandler.unAuthorized("Unautherized"));
  }

  const token = authHeader.split(" ")[1];

  //veryfing token on server wether it is tempered or not
  try {
    const { _id, role } = await JwtService.verify(token);
    //yaha hamne id object me id or role ko store kiya aur req jo ki ek object usme ek propery add kiya user naam se (req.user) aur usme woo id aur role daal diya jo ki hamne save kiya the jwt me
    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (error) {
    return next(CustomeErrorHandler.unAuthorized("Unauthorized"));
  }
};

export default auth;

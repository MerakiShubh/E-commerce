import dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  DEBUG_MODE,
  MONOGODB_URI,
  JWT_SECRET,
  REFRESH_SECRET,
  APP_URL,
} = process.env;

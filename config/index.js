import dotenv from "dotenv";
dotenv.config();

export const { APP_PORT, DEBUG_MODE, MONOGODB_URI } = process.env;

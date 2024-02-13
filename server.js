import express from "express";
import { APP_PORT } from "./config";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import connectDB from "./db";
import auth from "./middlewares/auth";
import path from "path";

const app = express();

global.appRoot = path.resolve(__dirname);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));

// Error Handling Middleware
app.use(errorHandler);
app.use(auth);

// Connect to Database
connectDB()
  .then(() => {
    app.listen(APP_PORT, (err) => {
      if (err) {
        console.error(`Error starting server: ${err}`);
        return;
      }
      console.log(`Listening on port ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!", err);
  });

// app.listen(APP_PORT, () =>
//   console.log(`Server is running on port ${APP_PORT}`)
// );

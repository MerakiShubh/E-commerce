import express from "express";
import { APP_PORT } from "./config";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
// import connectDB from "./db";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", routes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to Database
// connectDB()
//   .then(() => {
//     app.listen(APP_PORT, (err) => {
//       if (err) {
//         console.error(`Error starting server: ${err}`);
//         return;
//       }
//       console.log(`Listening on port ${APP_PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed!!", err);
//   });

app.listen(APP_PORT, () =>
  console.log(`Server is running on port ${APP_PORT}`)
);

import express from "express";
import { APP_PORT } from "./config";
const app = express();
import routes from "./routes";
app.use(express.json());
import errorHandler from "./middlewares/errorHandler";
app.use("/api", routes);
//Dyan rahe middleware register hogi app.listen ke upar

app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

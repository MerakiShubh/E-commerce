import express from "express";
import { APP_PORT } from "./config";
import errorHandler from "./middlewares/errorHandler";
const app = express();


mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.on('error', console.error().bind(console, 'connection error:'))
db.once('open', ()=>{
    console.log("DB connecte...")
})

import routes from "./routes";
import mongoose from "mongoose";
app.use(express.json());
app.use("/api", routes);
//Dyan rahe middleware register hogi app.listen ke upar

app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

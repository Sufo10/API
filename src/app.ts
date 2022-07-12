import express from "express";
import createHttpError from "http-errors";
import userRoute from "./routes/route";
import mongoose from "mongoose";
import { DB } from "./config/config";
import { errorHandler } from "./middleware/errorHandler";
import passport from "passport";
import kPassport from "./middleware/passport";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
kPassport(passport);
app.use("/user", userRoute);
app.use(() => {
  throw createHttpError(404, "Route Not Found");
});

mongoose.connect(DB);
mongoose.connection.on("error", (err) => {
  console.log(err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

app.use(errorHandler);
app.listen(9000, () => {
  console.log("Server is running on port 9000");
});

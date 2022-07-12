import { RequestHandler, Request, Response, NextFunction } from "express";
import User, { IUser } from "../model/User-model";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config";
export const signupUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password }: IUser = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "User already exists!"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User created successfully!" }).status(201);
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const signinUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: IUser = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User does not exist!"));

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass)
      return next(createHttpError(401, "Password is incorrect!"));

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token);
    res.json({ name: user.name, token }).status(200);
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

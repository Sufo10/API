import { RequestHandler, Request, Response, NextFunction } from "express";
import validator from "../utils/validator";
import { userSchema } from "./userSchema";

export const registerValidation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => validator(userSchema.register, req.body, next);

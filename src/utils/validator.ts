import Joi from "@hapi/joi";
import { NextFunction } from "express";
import createHttpError from "http-errors";

const validator = async (
  schema: Joi.ObjectSchema,
  body: object,
  next: NextFunction
) => {
  const value = await schema.validate(body);

  try {
    value.error
      ? next(createHttpError(422, value.error.details[0].message))
      : next();
  } catch (err) {
    console.log(err);
  }
};
export default validator;

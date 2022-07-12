import Joi from "@hapi/joi";

export const userSchema = {
  signupUser: Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().required().min(10).max(255),
    password: Joi.string().required().min(5).max(255),
  }),
  signinUser: Joi.object({
    email: Joi.string().required().min(10).max(255),
    password: Joi.string().required().min(5).max(255),
  }),
};

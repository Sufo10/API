import UserModel from "../model/User-model";
import { JWT_KEY } from "../config/config";
import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";

const { Strategy } = passportJwt;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies.jwt;
  }

  return jwt;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};

export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      const user = await UserModel.findById(payload.id)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(() => done(null, false));
    })
  );
};

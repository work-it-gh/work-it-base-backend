import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt";

import { UserModel } from "../../models";
import { config } from "../../config";

const JWT_SECRET = config.JWT_SECRET;

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

export const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  console.log({ jwt_payload });
  UserModel.findOne({
    $or: [
      { _id: jwt_payload.id, email: jwt_payload.email },
      { _id: jwt_payload.id, phoneNumber: jwt_payload.phoneNumber },
    ],
  })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      return done(err, false);
    });
});

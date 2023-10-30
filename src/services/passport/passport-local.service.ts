// import { Strategy as LocalStrategy } from "passport-local";

// import { UserModel } from "../../models";
// import { compareSync } from "bcrypt";

// export const localStrategy = new LocalStrategy(
//   { usernameField: "username", passwordField: "password" },
//   (username, password, done) => {
//     UserModel.findOne({ $or: [{ email: username }, { phoneNumber: username }] })
//       .then((user) => {
//         if (user) {
//           if (!compareSync(password, user.password)) {
//             return done(null, false, { message: "incorrect password" });
//           }
//           return done(null, user);
//         } else {
//           return done(null, false);
//         }
//       })
//       .catch((err) => {
//         return done(err, false);
//       });
//   }
// );

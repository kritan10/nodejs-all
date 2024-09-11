import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from '../models/User.js';

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false);
    }
    if (!user.verifyPassword(user.password, password)) {
      return done(null, false);
    }
    return done(null, user);
  })
);

const loginHandler = passport.authenticate('local', { session: false });

export default loginHandler;

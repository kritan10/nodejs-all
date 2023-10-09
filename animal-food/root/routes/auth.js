import express from "express";
import passport from 'passport'
import LocalStrategy from 'passport-local';
import process from 'process';
import { v4 } from "uuid";
import { User } from "../models/user.js";

const router = express.Router()

// strategy to use for login (local = username/password)
// others might be google, facebook, auth0
passport.use('local', new LocalStrategy(async function verify(username, password, cb) {
    // cb almost like onDone() i.e. indicates auth process is complete

    const user = await User.findOne({ where: { username: username } })

    if (user === null) return cb(null, false, { message: "User not found" })

    if (user.password !== password) return cb(null, false, { message: "Invalid password" })

    return cb(null, user)
}))


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { name: user.username, id: user.id });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

// manual callback/middleware handling
// router.post("/login", function (req, res, next) {
//     passport.authenticate('local', function (err, user, info) {
//         if (err) return next(err);
//         if (user) {
//             req.logIn(user, function (err) {
//                 if (err) return next(err);
//                 res.json({ message: user })
//             });
//         } else {
//             res.status(400).json(info);
//         }
//     })(req, res, next);
// });

// everything managed by passportjs, only need to send options
router.post("/login", passport.authenticate('local', {
    failureMessage: true,
    successMessage: true,
    successRedirect: "/login-success",
    failureRedirect: "/login-fail"
}))

router.post("/register", async (req, res) => {
    const { username, password } = req.body
    const user = await User.create({ id: v4(), username: username, password: password })
    res.json({ message: `User ${user.username} created with id ${user.id}` })
})

router.get("/login-success", (req, res) => {
    res.send("Login success!")
})

router.get("/login-fail", (req, res) => {
    // req.session.messages will continue appending error messages on auth failure
    // so pop will give the most recent message and clear the array :)
    const message = req.session.messages.pop()
    res.json({ message: message })
})

export { router as authRouter }
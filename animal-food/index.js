import express from 'express'
import { animalRouter } from './root/routes/animal.js'
import { foodRouter } from './root/routes/food.js'
import passport from 'passport'
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { authRouter } from './root/routes/auth.js';
import cron from 'node-cron';

const app = express()

const port = 3000

app.set('views', './root/views')
app.set('view engine', 'pug')

// useful logger
app.use(morgan("common"));

// for reading json body
app.use(express.json())

// for reading form data (required for local auth)
app.use(express.urlencoded({ extended: false }));

// parsing cookies (required for local auth)
app.use(cookieParser());

// for session management
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
}))

// for (binding) passport and session
app.use(passport.authenticate('session'))


app.use("/", authRouter)
app.use("/animal", animalRouter)
app.use("/food", foodRouter)

// route to check server status
app.get("/hello", (req, res) => {
    res.json({ message: "hello world" })
})

// route to check user status
app.get("/user", (req, res) => {
    res.json({ user: req.user ? req.user : "no user" })
})

// cron job example
app.get("/cron", (req, res) => {
    cron.schedule('* * * * * *', () => {
        console.log('running a task every minute');
    });
    res.end("DONE")
})

app.listen(port, () => {
    console.log("Example app listening at port " + port)
})

export { app }
import express, { json } from 'express'
import { userRouter } from './root/router.js'

var app = express()
const port = 3000

// middleware to handle json req and res
app.use(json()) 

// user router
app.use("/user", userRouter)

// root get route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// root post route
app.post('/', (req, res) => {
    const username = req.body.user
    res.json({ "hello": username })
})

// listen starts the server at given port 
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

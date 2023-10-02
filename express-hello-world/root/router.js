import express from "express";
import { DateTime } from "luxon";

const userRouter = express.Router()

// refer to logger
userRouter.use(logger)

// list to replicate simple db
let users = [
    {
        "id": 0,
        "name": "Blake",
        "likes": "separate",
        "dislikes": "high",
    },
    {
        "id": 1,
        "name": "Chase",
        "likes": "underline",
        "dislikes": "mission",
    },
    {
        "id": 2,
        "name": "Mabel",
        "likes": "whether",
        "dislikes": "numeral",
    }
]

// returns all users
userRouter.get("/", (req, res) => {
    res.json(users)
})

// adds user
userRouter.post("/", (req, res) => {
    try {
        const nUser = req.body
        nUser.id = users.length
        users = [...users, nUser]
        res.json({ "message": "User added successfully" })
    } catch (error) {
        console.log(error);
    }
})

// returns user of given id
userRouter.get("/:uid", (req, res) => {
    const id = parseInt(req.params.uid)
    const user = users.find((u) => u.id === id)
    res.json(user ? user : { "message": "User not found!" })
})

// deletes user of given id
userRouter.delete("/:uid", (req, res) => {
    const id = parseInt(req.params.uid)
    let initialArraySize = users.length
    console.log(initialArraySize);
    users = users.filter((u) => {
        return u.id !== id
    })
    console.log(users.length);
    const isDeleted = initialArraySize === users.length + 1
    res.json(isDeleted ? { "message": "User deleted successfully" } : { "message": "Action not complete!" })
})

// updates user of given id and data provided in body
userRouter.put("/:uid", (req, res) => {
    const id = parseInt(req.params.uid)
    let initialArraySize = users.length
    const nUser = req.body
    users = users.filter((u) => { return u.id !== id })
    const isUpdated = initialArraySize === users.length + 1
    users = [...users, nUser]
    res.json(isUpdated ? { "message": "User updated successfully" } : { "message": "Action not complete!" })
    res.end()

})

// simple middleware to log request and time
function logger(req, res, next) {
    const id = req.params.uid ? req.params.uid : null
    const now = DateTime.now().toFormat('hh:mm:ss: SSS')
    console.log(`${req.method} --- id:${id} --- [${now}]`);
    next()
}

export { userRouter }
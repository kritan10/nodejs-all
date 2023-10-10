import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import grpc from "@grpc/grpc-js"
import { findUserByName } from "../db/UserDAO.js";

async function loginService(call, callback) {
    try {
        const username = call.request.username
        const password = call.request.password

        if (username === undefined || password === undefined) {
            throw new Error('invalid params')
        }

        const token = await validateUser(username, password)
        return callback(null, { success: true, token: token })

    } catch (error) {
        return callback({ message: error.message, code: grpc.status.ABORTED }, null)
    }
}

async function validateUser(username, password) {
    const user = await findUserByName(username)

    const isPasswordValid = await validatePassword(password, user.password);

    if (user === null || !isPasswordValid) {
        throw new Error('invalid details')
    }

    return jwt.sign(
        { id: user.id },
        'mysecretkey',
    )
}

async function validatePassword(password, hash) {
    console.log(hash);
    console.log(password);
    const isPasswordMatching = await bcrypt.compare(password, hash)
    console.log(isPasswordMatching);

    if (!isPasswordMatching) {
        throw new Error('invalid password')
    }

    return true
}


export { loginService }
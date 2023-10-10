/* eslint-disable no-unused-vars */
import User from "../model/User.js"
import connection from "./connection.js"

function findUserByName(username) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE username=?', [username], (err, result, fields) => {
            if (err) return reject(err)

            console.log(result);
            if (result.length == 0) return reject(new Error('user not found'))

            const { id, username, password } = result[0]
            const user = new User(id, username, password)

            resolve(user)
        })
    })
}

export { findUserByName }
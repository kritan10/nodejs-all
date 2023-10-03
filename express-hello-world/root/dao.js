import { connection } from "./db.js"

export const selectAllUsers  =  (cb) => {
    var query = connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        cb(results)
    });
}

export const insertUser = (user, cb) => {
    const statement = "INSERT INTO users (name, likes, dislikes) VALUES (?, ?, ?)"
    const values = Object.values(user).splice(0)
    connection.query(statement, values, function (error, results, fields) {
        if (error) throw error;
        cb(results)
    });
}

export const selectUserById = () => {
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}

export const deleteUser = () => {
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return results;
    });
}
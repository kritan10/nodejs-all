/* eslint-disable no-unused-vars */
import { createConnection } from "mysql2";

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'places',
    port: 3306,
});

connection.query("SELECT 1", (err, result, fields) => {
    if (err) throw err
    console.log("\nDatabase Connected");
})

export default connection
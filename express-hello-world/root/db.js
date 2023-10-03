import mysql2 from "mysql2"

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_schema',
    port: 3306,
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
    console.log("DB WORKING");
});

export { connection }
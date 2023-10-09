/* eslint-disable no-unused-vars */
import { createConnection } from "mysql2";
import Place from "../model/Place.js"

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

/**
 * 
 * @returns all places
 */
function getAllPlaces() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM places;', (err, result, fields) => {
            if (err) reject(err)
            console.log(`--- SELECT // ${result.length} ROWS SELECTED ---`);
            resolve(result)
        })
    })
}

/**
 * 
 * @param {number} id 
 * @returns place by id
 */
async function getPlace(id) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM places WHERE id=?;', [id], (err, result, fields) => {
            if (err) reject(err)
            console.log(`--- SELECT // ID = ${id} // ${result[0]} ---`);
            resolve(result[0])
        })
    })
}

/**
 * 
 * @param {Place} place the new place to add
 */
async function createPlace(place) {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO places(name, location, isOpen) VALUES (?,?,?);', [place.name, place.location, place.isOpen], (err, result, fields) => {
            if (err) reject(err)
            console.log(`--- INSERT // insertId =  ${result.insertId} // ${result.affectedRows} ROWS INSERTED ---`);
            resolve(result.affectedRows >= 1 ? true : false)
        })
    })
}

/**
 * 
 * @param {number} id id of the place to update
 * @param {Place} place the new values of the Place
 */
async function updatePlace(id, place) {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE places SET name=?,location=?,isOpen=? WHERE id=?;', [place.name, place.location, place.isOpen, id], (err, result, fields) => {
            if (err) reject(err)
            console.log(`--- UPDATE // ID = ${id} // ${result.affectedRows} ROWS UPDATED ---`);
            resolve(result.affectedRows >= 1 ? true : false)
        })
    })
}

/**
 * 
 * @param {number} id id of the place to delete
 */
async function deletePlace(id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM places WHERE id=?;', [id], (err, result, fields) => {
            if (err) reject(err)
            console.log(`--- DELETE // ID = ${id} // ${result.affectedRows} ROWS DELETED ---`);
            resolve(result.affectedRows >= 1 ? true : false)
        })
    })
}

export {
    getAllPlaces,
    getPlace,
    createPlace,
    updatePlace,
    deletePlace,
}



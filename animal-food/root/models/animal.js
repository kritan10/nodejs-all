import { v4 as uuid } from 'uuid';
import { createConnection } from 'mysql2';

class Animal {
    constructor(animal, foodtype) {
        this.id = uuid()
        this.animal = animal
        this.foodtype = foodtype
    }

    /**
     * 
     * @param {Request} req 
     * @returns {Animal}
     */
    static createAnimal(req) {
        const body = req.body
        if ((body.animal == undefined || body.foodtype == undefined)) {
            return null
        }
        return new Animal(body.animal, body.foodtype)
    }
}

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'animal_food',
    port: 3306,
});

function getAllAnimals() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM animals", (err, result, fields) => {
            if (err) reject(err)
            console.log(result);
            resolve(result)
        })
    })
}

/**
 * 
 * @param {Animal} animal 
 * @param {*} cb 
 */
function insertAnimal(animal) {
    const statement = "INSERT INTO animals(id, animal, foodtype) VALUES (?, ?, ?)"
    const values = [animal.id, animal.animal, animal.foodtype]

    return new Promise((resolve, reject) => {
        connection.query(statement, values, (err, results, fields) => {
            if (err) reject(err)
            console.log(results);
            resolve(results.affectedRows == 1)
        })
    })
}


/**
 * 
 * @param {*} id 
 * @returns 
 */
function getAnimalById(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM animals WHERE id=?", [id], (err, results, fields) => {
            if (err) reject(err)
            console.log(results);
            resolve(results)
        })
    })
}
/**
 * 
 * @param {string} id 
 * @param {} animal 
 * @returns 
 */

function editAnimal(animal) {
    const statement = "UPDATE animals SET animal=?,foodtype=? WHERE id=?"
    const values = [animal.animal, animal.foodtype, animal.id]
    return new Promise((resolve, reject) => {
        connection.query(statement, values, (err, results, fields) => {
            if (err) reject(err)
            console.log(results);
            resolve(results.affectedRows == 1)
        })
    })
}

function deleteAnimal(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM animals WHERE id=?", [id], (err, results, fields) => {
            if (err) reject(err)
            console.log(results);
            resolve(results.affectedRows == 1)
        })
    })
}



export { Animal, getAllAnimals, insertAnimal, getAnimalById, editAnimal, deleteAnimal }


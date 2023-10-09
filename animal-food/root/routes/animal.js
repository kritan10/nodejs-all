import express from "express";
import { Animal, getAllAnimals, insertAnimal, getAnimalById, editAnimal, deleteAnimal } from "../models/animal.js";
import { authMiddleware } from "../middleware/auth.js";
import errorMiddleware from "../middleware/error.js";

const router = express.Router()

// router.set('views', './root/views/animal')

router.use(authMiddleware)
router.use(errorMiddleware)

// get all animals
router.get("/", async (req, res) => {
    const animals = await getAllAnimals()
    res.json({
        "success": true,
        "count": animals.length,
        "data": animals
    })
})

// get (html) animals
router.get("/view", async (req, res) => {
    const animals = await getAllAnimals()
    res.render('animal', { animals: animals })
})

// add animal
router.post("/", async (req, res) => {
    const animal = Animal.createAnimal(req)

    if (animal == null) {
        res.json({ "message": "Invalid or missing field(s) for Animal" })
        return
    }

    const queryResult = await insertAnimal(animal)
    res.json({ "message": queryResult ? "Animal added successfully!" : "Error adding animal!" })
})

// get animal by id
router.get("/:uid", async (req, res) => {

    const uid = req.params.uid

    if (uid == null) {
        res.json({ "message": "Invalid Animal id" })
        return
    }

    const animal = await getAnimalById(uid)
    res.json({ "success": "true", data: animal })
})

// edit animal
router.put("/:uid", async (req, res) => {

    const animal = Animal.createAnimal(req)
    animal.id = req.params.uid

    console.log(req.params.uid);
    console.log(animal);

    if (req.params.uid == null) {
        res.json({ "message": "Invalid Animal id" })
        return
    }

    const result = await editAnimal(animal)
    const message = result ? `Animal of ${req.params.uid} was updated` : "Animal not updated."
    res.json({ "success": result, message: message })
})

// delete animal
router.delete("/:uid", async (req, res) => {
    const uid = req.params.uid

    if (uid == null) {
        res.json({ "message": "Invalid Animal id" })
        return
    }

    const result = await deleteAnimal(uid)
    const message = result ? `Animal of ${req.params.uid} was deleted.` : "Animal not deleted."
    res.json({ "success": result, message: message })
})


export { router as animalRouter }
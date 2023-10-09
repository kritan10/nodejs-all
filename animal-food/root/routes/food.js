import express from 'express'
import food from '../db/models/foods.js'
import { sequelize } from '../db/sequelize.js'
import { DataTypes } from 'sequelize'
import { v4 } from 'uuid'

const router = express.Router()
const Food = food(sequelize, DataTypes)

router.get("/", async (req, res) => {
    const foods = await Food.findAll()
    res.json({
        "success": true,
        "count": foods.length,
        "data": foods
    })
})

router.post("/", async (req, res) => {
    const { name, foodtype, price } = req.body
    const result = await Food.create({ id: v4(), name: name, foodtype: foodtype, price: price })
    res.json({ "message": "Food added successfully!" })
})

router.get("/:uid", async (req, res) => {
    const food = await Food.findByPk(req.params.uid)
    res.json({ "message": food })
})

router.put("/:uid", async (req, res) => {
    const { name, foodtype, price } = req.body

    let updateFood = {}

    if (name !== undefined) {
        updateFood.name = name
    }

    if (foodtype !== undefined) {
        updateFood.foodtype = foodtype
    }

    if (price !== undefined) {
        updateFood.price = price
    }

    const result = await Food.update(
        updateFood,
        {
            where: {
                id: req.params.uid
            }
        }
    )
    res.json({ "message": "Food updated successfully!" })
})

router.delete("/:uid", async (req, res) => {
    const result = await Food.destroy({
        where: {
            id: req.params.uid
        }
    })
    res.json({ "message": result ? "Food deleted successfully!" : "Food not found!" })
})

export { router as foodRouter }
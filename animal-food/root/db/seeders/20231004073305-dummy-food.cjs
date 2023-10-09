'use strict';

const { v4 } = require('uuid');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('foods', null, {});

    const randomFoods = [
      "Sushi",
      "Pizza",
      "Tacos",
      "Lasagna",
      "Chicken Tikka Masala",
      "Chocolate Cake",
      "Pho",
      "BLT Sandwich",
      "Greek Salad",
      "Spaghetti Carbonara",
      "Pad Thai",
      "Falafel",
      "Beef Stir-Fry",
      "Clam Chowder",
      "Shrimp Scampi",
      "Croissant",
      "Biryani",
      "Guacamole",
      "Eggs Benedict",
      "Caramel Popcorn"
    ];

    const foodtypes = ['vegetarian', 'non-vegetarian', 'vegan']
    const data = []
    for (let index = 0; index < randomFoods.length; index++) {
      data.push({
        id: v4(),
        name: randomFoods[index],
        foodtype: faker.helpers.arrayElement(foodtypes),
        price: faker.number.int({ min: 1, max: 20 }) / 2 * 100,
      })

    }
    await queryInterface.bulkInsert('foods', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('foods', null, {});
  }
};

'use strict';

const { faker } = require('@faker-js/faker');
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('animals')

    const animals = []
    const foodtypes = ['CARNIVORE', 'HERBIVORE', 'OMNIVORE']
    for (let index = 0; index < 50; index++) {
      animals.push(
        {
          id: v4(),
          animal: faker.animal.type(),
          foodtype: faker.helpers.arrayElement(foodtypes)
        }
      )

    }
    await queryInterface.bulkInsert('animals', animals)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animals')
  }
};

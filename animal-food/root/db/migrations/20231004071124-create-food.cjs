'use strict';

const { DataTypes } = require("sequelize"); // Import the built-in data types


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('foods', {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING
            },
            foodtype: {
                type: DataTypes.STRING
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('foods');
    }
};
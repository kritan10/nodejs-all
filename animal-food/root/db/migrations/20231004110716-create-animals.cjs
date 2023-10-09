'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('animals', {
            id: { type: Sequelize.UUID, primaryKey: true },
            animal: { type: Sequelize.STRING },
            foodtype: { type: Sequelize.STRING }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('animals');
    }
};

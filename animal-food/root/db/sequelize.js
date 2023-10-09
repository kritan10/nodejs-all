import { Sequelize } from "sequelize";

const sequelize = new Sequelize('animal_food', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    define: { timestamps: false }
},
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export { sequelize }
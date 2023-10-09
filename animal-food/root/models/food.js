import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

class Food extends Model { }

Food.init({
    // Model attributes are defined here
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    },
    foodtype: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize, // We need to pass the connection instance
    modelName: 'Food' // We need to choose the model name
});

export { Food }
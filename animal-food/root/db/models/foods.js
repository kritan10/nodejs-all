'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class Food extends Model { }
    Food.init({
        // Model attributes are defined here
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
        },
        price: {
            type: DataTypes.INTEGER
        }
    }, {
        sequelize, // We need to pass the connection instance
        tableName: 'foods'
    });
    return Food;
};
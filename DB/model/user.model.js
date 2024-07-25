import {DataTypes} from 'sequelize'
import { sequelize } from '../connection.js'

const userModel = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    confirmEmail:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default userModel;
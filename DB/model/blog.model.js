import {DataTypes} from 'sequelize'
import { sequelize } from '../connection.js'
import userModel from './user.model.js';

const blogModel = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
   
});

userModel.hasMany(blogModel);

blogModel.belongsTo(userModel);

export default blogModel;
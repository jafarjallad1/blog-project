import { Sequelize } from "sequelize";

 export const sequelize = new Sequelize('blogs-project', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

 const connectionDb = async()=>{
    try {
       return await sequelize.sync();
        
    } catch (error) {
        console.log('Unable to connect to the database');
    }
}

export default connectionDb;
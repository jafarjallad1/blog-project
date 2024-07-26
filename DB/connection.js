import { Sequelize } from "sequelize";

 export const sequelize = new Sequelize('freedb_blog_project', 'freedb_jafar', 'y9WUssM!$#3U7k8', {
  host: 'sql.freedb.tech',
  port: 3306,
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
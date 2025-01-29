const { Sequelize } = require('sequelize');
// Sequelize ORM
const sequelize = new Sequelize('studentDB', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
module.exports = { sequelize, connectDB };
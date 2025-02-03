const { Sequelize } = require('sequelize');
const envConfig = require('./env.config');
// Sequelize ORM
const sequelize = new Sequelize(envConfig.db_name, envConfig.db_user, envConfig.db_password, {
    host: envConfig.db_host,
    dialect: envConfig.db_dialect
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
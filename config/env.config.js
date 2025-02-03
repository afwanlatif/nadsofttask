const dotenv = require('dotenv');

dotenv.config();

const { PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

module.exports = {
    port: PORT,
    db_name: DB_NAME,
    db_user: DB_USER,
    db_password: DB_PASSWORD,
    db_host: DB_HOST,
    db_dialect: DB_DIALECT
}
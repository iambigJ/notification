/* -------------------------------- Packages -------------------------------- */
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    appConfigs.DB.db,
    appConfigs.DB.username,
    appConfigs.DB.password,
    {
        host: appConfigs.DB.host,
        dialect: appConfigs.DB.dialect,
    }
);

sequelize
    .authenticate()
    .then(() => console.log("[+] connected to db successfully"))
    .catch((err) => console.log(err));

module.exports = sequelize;

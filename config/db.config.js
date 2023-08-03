require("dotenv").config();

module.exports = {
    HOST: process.env.MYSQLDB_HOST || "localhost",
    USER: process.env.MYSQLDB_USER || "root",
    PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD || "123456",
    DB: process.env.MYSQLDB_DATABASE || "nodejsproject",
    port: process.env.MYSQLDB_LOCAL_PORT || 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
};
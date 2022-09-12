const fs = require('fs');
const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const path = require('path');

const basename = path.basename(__filename);

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
// db.role = require("./role")(sequelize, Sequelize);
// db.user = require("./user")(sequelize, Sequelize);
// db.order = require("./order")(sequelize, Sequelize);
// db.category = require("./category")(sequelize, Sequelize);
// db.product = require("./product")(sequelize, Sequelize);
// db.subOrder = require("./subOrder")(sequelize, Sequelize);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
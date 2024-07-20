require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_BASE } = process.env;

console.log("DB_USER:", DB_USER);
console.log("DB_PASSWORD:", DB_PASSWORD);
console.log("DB_HOST:", DB_HOST);
console.log("DB_PORT:", DB_PORT);
console.log("DB_BASE:", DB_BASE);

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_BASE}`,
  { logging: false, native: false }
);

const User = require("./models/users")(sequelize);
const Task = require("./models/Task")(sequelize);

User.hasMany(Task, { foreignKey: "userId", sourceKey: "id" });
Task.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

module.exports = {
  conn: sequelize,
  User,
  Task,
};

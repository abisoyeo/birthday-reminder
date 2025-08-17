const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://username:password@localhost:5432/userdb",
  {
    dialect: "postgres",
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function initDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

module.exports = { sequelize, testConnection, initDatabase };

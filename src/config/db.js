const { Sequelize, DataTypes } = require("sequelize");

const useSSL = process.env.DB_SSL === "true";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
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

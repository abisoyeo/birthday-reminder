const cron = require("node-cron");
const User = require("../models/model");
const { fn, col, Sequelize } = require("sequelize");

const sendBirthdayEmail = require("../utils/sendEmail");

const sendBirthdayMsg = () => {
  const schedule = process.env.CRON_SCHEDULE || "0 7 * * *"; // default 7AM

  cron.schedule(schedule, async () => {
    console.log(
      `Running daily birthday check... ${new Date().toLocaleString()}`
    );
    const users = await getBirthdays();
    if (users.length > 0) {
      sendEmail(users);
    } else {
      console.log("No user birthday today");
    }
  });
};

const getBirthdays = async () => {
  const today = new Date();

  const month = today.getUTCMonth() + 1;
  const day = today.getUTCDate();

  const users = await User.findAll({
    where: Sequelize.where(
      fn("TO_CHAR", col("dateOfBirth"), "MM-DD"),
      "=",
      fn("TO_CHAR", fn("NOW"), "MM-DD")
    ),
  });
  return users;
};

const sendEmail = (users) => {
  users.forEach(async (user) => {
    await sendBirthdayEmail(user.email, user.username);
  });
};
module.exports = { sendBirthdayMsg };

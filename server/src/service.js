const cron = require("node-cron");
const User = require("./model");
const sendBirthdayEmail = require("./sendEmail");

const sendBirthdayMsg = () => {
  const schedule = process.env.CRON_SCHEDULE || "0 7 * * *"; // default 7AM

  cron.schedule(schedule, async () => {
    console.log(`Running daily birthday check...${Date.now()}`);
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

  const users = await User.find({
    $expr: {
      $and: [
        { $eq: [{ $month: "$dateOfBirth" }, month] },
        { $eq: [{ $dayOfMonth: "$dateOfBirth" }, day] },
      ],
    },
  });
  return users;
};

const sendEmail = (users) => {
  users.forEach(async (user) => {
    await sendBirthdayEmail(user.email, user.username);
  });
};
module.exports = { sendBirthdayMsg };

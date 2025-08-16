const nodemailer = require("nodemailer");

async function sendBirthdayEmail(to, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎉 Happy Birthday, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px; background:#f9fafb;">
        <div style="max-width:600px; margin:auto; background:#fff; padding:24px; border-radius:8px; text-align:center;">
          <h2 style="color:#333; margin-bottom:12px;">Happy Birthday, ${name}! 🎂</h2>
          <p style="font-size:16px; color:#555; line-height:1.5;">
            Wishing you a wonderful day filled with happiness, love, and good memories.  
          </p>
          <p style="font-size:16px; color:#555; line-height:1.5; margin-top:16px;">
            Cheers to another amazing year ahead! 🎉
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Birthday email sent to ${to}`);
}

module.exports = sendBirthdayEmail;

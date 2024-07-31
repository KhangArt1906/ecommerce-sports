const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async ({ email, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Ecommerce Sports" <no-reply@ecommercesports@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot password", // Subject line
    html: html, //html body
  });

  return info;
});

module.exports = sendEmail;

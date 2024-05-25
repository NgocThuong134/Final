const nodemailer = require("nodemailer");
const {google} = require('googleapis')
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "gnouht89@gmail.com",
    pass: "wuolbikyjgwwleuo",
  },
});
  exports.sendResetEmail = async (req, res) => {
    const email = req.body.email;
    const resetLink = `http://${req.headers.host}/login/resetPassword?token=${req.resetPasswordToken}`;
    const mailOptions = {
      from: "gnouht89@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Please click on the following link to reset your password: ${resetLink}`,
      html: `<p>Please click on the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error sending email");
      } else {
        res.send("An email has been sent to " + email);
      }
    });
  };

const userDb = require("../models/userSchema");
require("dotenv").config();
const accountSid = "AC2d1612f981d4b2ef4b1cee3457b64197";
const authToken = "74a8737cf3600be01887f46ebb164370";
const client = require("twilio")(accountSid, authToken);

exports.sendOTP = async (req, res) => {
  const { phone } = req.body;
  const formattedPhone = `+84384516228`;
  try {
    client.messages
      .create({
        from: "+16364059350",
        to: "+84384516228",
        body: "this is a testing message",
      })
      .then(function (res) {
        console.log("message has sent!");
      })
      .catch(function (err) {
        console.log(err);
      });
    /* const verification = await client.verify.v2
      .services("VA3195f708ba7bd2177a12730398cce6db")
      .verifications.create({
        to: "+16364059350",
        channel: "sms",
        timeout: 60,
      });

    if (verification.status === "pending") {
      res.send("OTP sent successfully"); // Send a simple text response
    } else {
      res.send("Failed to send OTP"); // Send a simple text response
    } */
  } catch (error) {
    console.error("Error sending OTP", error);
    res.send("Error sending OTP"); // Send a simple text response
  }
};

exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;
  const userData = await userDb.findOne({ phone });
  try {
    const verificationResult = await client.verify.v2
      .services("VA3195f708ba7bd2177a12730398cce6db")
      .verificationChecks.create({ to: phone, code: otp });

    if (verificationResult.status === "approved") {
      //session
      req.session.user = userData;
      return res.redirect("/home");
    } else {
      // OTP verification failed
      res.render("user/login-otp", { message: "Incorrect OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP", error);
    res.render("user/login-otp", { message: "Error verifying OTP" });
  }
};

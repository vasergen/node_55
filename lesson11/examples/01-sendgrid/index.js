require("dotenv").config();
const sendGrid = require("@sendgrid/mail");

const { API_KEY } = process.env;
sendGrid.setApiKey(API_KEY);

async function main() {
  try {
    const email = {
      from: "vasergen@gmail.com",
      to: "vasergen@gmail.com",
      subject: "send email test 2",
      html: "Hi <b>there</b>!",
      text: "Hi there!",
    };

    await sendGrid.send(email);
    console.log("email sent");
  } catch (error) {
    console.error("sending email failed");
  }
}
main();

//
// info@mymovies.com

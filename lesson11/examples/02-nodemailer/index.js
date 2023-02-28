const nodemailer = require("nodemailer");

async function main() {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b41f0dc2c73c92",
      pass: "1972be02a44763",
    },
  });

  const email = {
    from: "vasergen@gmail.com",
    to: "vasergen@gmail.com",
    subject: "send email test 2",
    html: "Hi <b>there</b>!",
    text: "Hi there!",
  };

  const response = await transport.sendMail(email);
  console.log(response);
}
main();

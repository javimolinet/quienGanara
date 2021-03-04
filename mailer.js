const nodemailer = require('nodemailer')

const enviarCorreo = async (to, subject, html) => {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "nodemailerADL@gmail.com",
      pass: "desafiolatam",
    },
  });

  let mailOption = {
    from: "nodemailerADL@gmail.com",
    to : "javy.molinet@gmail.com",
    subject,
    html,
  };

  const enviarCorreo = await transporter.sendMail(mailOption);
  return enviarCorreo;
};

module.exports = enviarCorreo;
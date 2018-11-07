const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post("/api/send_mail", async (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
        }
    });

  const { name, email, body } = req.body;
  let mailOptions = {
    from: `${name} <${email}>`,
    to: "jamesgower1994@gmail.com",
    subject: "Portfolio Contact Form -- URGENT",
    text: body,
    html: body,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if(error) return res.send(error);
    console.log("Message sent: %s", info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    res.send("Message sent: %s", info.messageId);
  });
});
});

app.listen(port, () => {
  console.log('Server is up!');
});

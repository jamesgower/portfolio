const path = require("path");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const SMTPServer = require("smtp-server").SMTPServer;

const port = process.env.PORT || 5000;
const options = {
  onData(stream, session, cb) {
    stream.pipe(process.stdout);
  },
};

const server = new SMTPServer(options);

const isProduction = process.env.NODE_ENV === "production";

app.post("/api/send_mail", async (req, res) => {
  const { name, email, details } = req.query;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.googleUser,
      pass: process.env.googlePW,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "contact@james-gower.dev",
    subject: "!! Portfolio Message -- URGENT !!",
    text: `${name} has sent you a message: \n
        ${details}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log("Email sent: " + info.response);
  });
});

if (isProduction) {
  const publicPath = path.join(__dirname, "../dist");

  app.use(express.static(publicPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

server.listen(450, () => {
  console.log("SMTP server online at port 450");
});

app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`);
});

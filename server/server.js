const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const nodemailer = require("nodemailer");

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
            rejectUnauthorized: false
        }
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

if (process.env.NODE_ENV === "production") {
    const publicPath = path.join(__dirname, "../dist");

    app.use(express.static(publicPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });
}

app.listen(port, () => {
    console.log("Server is up at port", port);
});

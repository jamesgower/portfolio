const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const nodemailer = require("nodemailer");
const keys = require("./keys");

app.post("/api/send_mail", async (req, res) => {
    const { name, email, details } = req.query;
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: keys.googleUser,
            pass: keys.googlePW,
        },
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: "jgower.dev@gmail.com",
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
    const publicPath = path.join(__dirname, "../public", "dist");

    app.use(express.static(publicPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });
}

app.listen(port, () => {
    console.log("Server is up at port", port);
});

import express, { Response, Request } from "express";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const path = require("path");

const { OAuth2 } = google.auth;

const app = express();
const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.post(
  "/api/send_mail",
  async (req: Request, res: Response): Promise<void> => {
    const { name, email, details } = req.query;

    const oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NODE_ENV === "production"
        ? "https://www.james-gower.dev"
        : "http://localhost:5000",
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    const tokens = await oauth2Client.refreshAccessToken();
    const accessToken = tokens.credentials.access_token;

    const transporter: nodemailer.Transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "jamesgower1994@gmail.com",
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "jamesgower1994@gmail.com",
      subject: "!! Portfolio Message -- URGENT !!",
      generateTextFromHTML: true,
      html: `<b>${name} has sent you a message:</b>\n
        ${details}`,
    };

    transporter.sendMail(
      mailOptions,
      (error, info): express.Response => {
        if (error) {
          console.log(error);
          return res.send(false);
        }
        console.log(`Email sent: ${info.response}`);
        return res.send(true);
      },
    );
  },
);

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "../dist");

  app.use(express.static(publicPath));

  app.get(
    "*",
    (req, res: Response): void => {
      res.sendFile(path.join(publicPath, "index.html"));
    },
  );
}

app.listen(
  port,
  (): void => {
    console.log("Server is up at port", port);
  },
);

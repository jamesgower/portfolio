import { isEmail } from "validator";
import express, { Response, Request } from "express";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import cors from "cors";

export const app = express();
const path = require("path");

const { OAuth2 } = google.auth;

app.use(cors());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production "
        ? "https://www.james-gower.dev"
        : "http://localhost:8080",
  }),
);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.post(
  "/api/send_mail",
  async (req: Request, res: Response): Promise<Response> => {
    const { name, email, details } = req.query;
    if (
      name.length === 0 ||
      email.length === 0 ||
      details.length === 0 ||
      !isEmail(email) ||
      details.length > 10000
    ) {
      return res.status(400).send(false);
    }

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

    const getToken = await oauth2Client.getAccessToken();
    const accessToken = getToken.token;

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
      from: `${name} <${email}>`,
      to: "jamesgower1994@gmail.com",
      subject: "!! Portfolio Message -- URGENT !!",
      generateTextFromHTML: true,
      html: `<b>${name} has sent you a message:</b> <br />
      ${name}'s email address: ${email} <br /> <br />
        ${details}`,
    };

    transporter.sendMail(mailOptions, (error): void => {
      if (error) {
        res.status(404).json({
          success: false,
          error,
        });
      }
    });
    return res.status(200).json({
      success: true,
    });
  },
);

import("./sockets");

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "../dist");

  app.use(express.static(publicPath));

  app.get("*", (req, res: Response): void => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

import { isEmail } from "validator";
import express, { Response, Request } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import passport from "passport";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import cors from "cors";
import requireLogin from "./emaily/middlewares/requireLogin";
import { AuthRequest } from "./emaily/interfaces/routes.i";

// eslint-disable-next-line import/order
const keys = require("./emaily/config/keys");
const path = require("path");
const stripe = require("stripe")(keys.stripeSecretKey);

require("./emaily/models/User");
require("./emaily/models/Survey");
require("./emaily/services/passport");

console.log(keys);
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

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

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res): void => {
    res.redirect("/emaily/surveys");
  },
);

app.get("/api/logout", (req: AuthRequest, res): void => {
  req.logout();
  res.redirect("/");
});

app.get("/api/current_user", (req: AuthRequest, res): void => {
  res.send(req.user);
});

app.post(
  "/api/stripe",
  requireLogin,
  async (req: AuthRequest, res): Promise<void> => {
    await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5.00 for 5 Emaily credits",
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  },
);

require("./emaily/routes/surveyRoutes")(app, requireLogin, mongoose);

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

require("./sockets")(app);

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "../dist");

  app.use(express.static(publicPath));

  app.get("*", (req, res: Response): void => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

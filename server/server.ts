import * as express from "express";
import path from "path";
import { createTransport, Transporter } from "nodemailer";
import { EmailRequest, SendResponse } from "./interfaces/server.i";
import keys from "../keys";

const app = express();
const port = process.env.PORT || 5000;

app.post(
  "/api/send_mail",
  async (req: EmailRequest): Promise<void> => {
    const { name, email, details } = req.query;
    const transporter: Transporter = createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.googleUser || keys.googleUser,
        pass: process.env.googlePW || keys.googlePW,
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

    transporter.sendMail(
      mailOptions,
      (error, info): void => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      },
    );
  },
);

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "../dist");

  app.use(express.static(publicPath));

  app.get(
    "*",
    (req, res: SendResponse): void => {
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

import { isEmail } from "validator";
import express, { Response, Request } from "express";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import socketIO from "socket.io";
import cors from "cors";
import {
  generateMessage,
  generateLocationMessage,
} from "../src/pages/chatter/utils/message";
import { isRealString } from "../src/pages/chatter/utils/validation";
import { Users } from "../src/pages/chatter/utils/users";

const app = express();
const path = require("path");
const server = require("http").Server(app);

const io = socketIO(server);
const users = new Users();

const { OAuth2 } = google.auth;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:8080" })); // FIXME

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

server.listen(port, (): void => {
  console.log("Chat server is up at port", port);
});

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

/*
    The io.on connection function is the manager which controls all connections and messages in
    the whole application. It will log a statement when a new user is connected to any room.
*/
io.on("connection", (socket): void => {
  console.log(`New user connected at socket ${socket.id}`);

  socket.on("join", (params, callback): void => {
    /* 
      The parameters are checked to be real strings, and uses the callback function
      if either are not valid, to say that they are required to connect to a room.
    */
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and room name are required.");
    }

    /*
      If there is more than one user in the chosen chat room with the same name as the one
      which the original user has picked, then the name will be appended with squared brackets
      and a number to make each user unique. (e.g Bill[1]).
    */
    if (users.getUserList(params.room).indexOf(params.name) > -1) {
      const usersArr = users.getUserList(params.room);
      const matches = usersArr.filter((user): boolean => params.user !== user).length;
      params.name = `${params.name}[${matches + 1}]`;
    }
    /*
            If there are no errors, the user will be connected to the room which is specified
            in the params.room value.
        */
    socket.join(params.room);
    /*
            The user is removed from all other rooms when added to the new room
        */
    users.removeUser(socket.id);
    /*
            The users' values are added to the chosen rooms' users array, and the updateUserList function is
            emitted to update the sidebar with all of the users in the rooms values. The newMessageAdmin function 
            is then emitted to alert all users apart from the current user in the room that the new user has entered 
            the room, alongside an admin message that only the current user will receive which welcomes them to the room. 
        */
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit("updateUserList", users.getUserList(params.room));
    socket.emit(
      "newMessageAdmin",
      generateMessage("Admin", `Welcome to the ${params.room} room.`),
    );
    socket.broadcast
      .to(params.room)
      .emit(
        "newMessageAdmin",
        generateMessage("Admin", `${params.name} has joined the chat room.`),
      );
    callback();
  });

  /*
        The socket.on createMessage function emits an event which both sends a message which shows as a blue message, sent
        from the user to all others in the room; and a green message, which shows up to other users as a received message.
    */
  socket.on("createMessage", (message, callback): void => {
    const user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      socket.broadcast.emit("newMessage", generateMessage(user.name, message.text));
      socket.emit("newMessageSent", generateMessage(user.name, message.text));
    }
    callback();
  });

  /*
        The socket.on createLocationMessage function emits an event which both sends a message with a link containing the users current location,
        which shows as a blue message, sent from the user to all others in the room; and a green location message, which shows up to other users 
        as a received message.
    */
  socket.on("createLocationMessage", (coords): void => {
    const user = users.getUser(socket.id);
    if (user) {
      socket.broadcast.emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude),
      );
      socket.emit(
        "newLocationMessageSent",
        generateLocationMessage(user.name, coords.latitude, coords.longitude),
      );
    }
  });

  /*
        The socket.on disconnect function updates the UserList sidebar inside the current chat room
        when a user leaves. It also emits a red message, which looks like it comes from the administrator,
        saying that the user has left the room.
    */
  socket.on("disconnect", (): void => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("updateUserList", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("Admin", `${user.name} has left the room.`),
      );
    }
  });
});

if (process.env.NODE_ENV === "production") {
  const publicPath = path.join(__dirname, "../dist");

  app.use(express.static(publicPath));

  app.get("*", (req, res: Response): void => {
    res.sendFile(path.join(publicPath, "index.html"));
  });
}

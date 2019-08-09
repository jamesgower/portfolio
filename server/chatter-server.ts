import http from "http";
import socketIO from "socket.io";
import { app } from "./server";
import {
  generateMessage,
  generateLocationMessage,
} from "../src/pages/chatter/utils/message";
import { isRealString } from "../src/pages/chatter/utils/validation";
import { Users } from "../src/pages/chatter/utils/users";

const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

/*
    The io.on connection function is the manager which controls all connections and messages in
    the whole application. It will log a statement when a new user is connected to any room.
*/
io.on("connection", (socket): void => {
  console.log("New user connected.");

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
      const matches = usersArr.filter((user) => params.user !== user).length;
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
  socket.on("createMessage", (message, callback) => {
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
  socket.on("createLocationMessage", (coords) => {
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
  socket.on("disconnect", () => {
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

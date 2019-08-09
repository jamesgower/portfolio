const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");
const publicPath = path.join(__dirname, "../../build");
const app = express();
const server = http.createServer(app);

app.use(express.static(publicPath));

/*
    The port is set to be the PORT environment variable which is set by Heroku, if the node environment is not in development,
    or if it is, then it will use port 5000 - which can be accessed from localhost:5000.
*/
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});

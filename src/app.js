const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nocache = require("nocache");
const morgan = require("morgan");
const app = express();

const sessionMiddleware = require("./middleware/user/sessionMiddleware");
require("./db/mongodb");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 8001;

//Gives random string to session
app.use(sessionMiddleware);

app.use(nocache());

//Parse request to body-parser
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//logs all http requests
app.use(morgan("tiny"));

//set view engine
app.set("view engine", "ejs");

//load assets
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.static(path.join("uploads")));

app.use(express.static("js"));
app.get("/chat", (req, res) => {
  res.render("chat");
});
app.get("/admin/chat", (req, res) => {
  res.render("chat");
});
io.emit("hello", "world");
io.on("connection", (socket) => {
  socket.broadcast.emit("hi");
  socket.emit('socket id', socket.id);
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});


app.use("/", require("./routes/user-routes"));
app.use("/", require("./routes/admin-routes"));

server.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});

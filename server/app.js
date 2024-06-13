const express = require("express");
const { Server } = require("socket.io");
const createError = require("http-errors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const conversationsRouter = require("./routes/conversations");

const app = express();

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  }
});

io.listen(4000);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// eslint-disable-next-line no-use-before-define, no-console
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://ADyer4201:bzAo29ZAYXHKhP5t@messagesdb.wosk06l.mongodb.net/?retryWrites=true&w=majority&appName=MessagesDB`,
  );
  // eslint-disable-next-line no-console
  console.log("Connected to MongoDB");
}

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('a user connected');

  socket.on('JoinRoom', (room) => {
    socket.join(room);
    // eslint-disable-next-line no-console
    console.log('user joined room:', room);
  })

  socket.on('sendMessage', (room, message) => { 
    // eslint-disable-next-line no-console
    console.log(`New message in room ${room}:`, message);
    io.to(room).emit('receiveMessage', message);
  });

  socket.on('DeleteConversation', (conversationId) => {
    // eslint-disable-next-line no-console
    console.log('deleting conversation:', conversationId);
    io.emit('DeleteConversation', conversationId);
  });

  socket.on('addConversation', (userRoom, contactRoom, conversation) => {
    // eslint-disable-next-line no-console
    console.log('adding conversation:', conversation);
    io.to(userRoom).emit('addConversation', conversation);
    io.to(contactRoom).emit('addConversation', conversation);
  });

  socket.on('DeleteContact', (room, data) => { 
    // eslint-disable-next-line no-console
    console.log('deleting contact:', data);
    io.to(room).emit('DeleteContact', data);
  });

  socket.on('AcceptContactRequest', (room, data) => { 
    // eslint-disable-next-line no-console
    console.log('accepting contact request:', data);
    io.to(room).emit('AcceptContactRequest', data);
  });

  socket.on('RejectContactRequest', (room, data) => {
    // eslint-disable-next-line no-console
    console.log('rejecting contact request:', data);
    io.to(room).emit('RejectContactRequest', data);
  });

  socket.on('UpdatePendingContacts', (room, data) => { // Change to SendContactRequest
    // eslint-disable-next-line no-console
    console.log('updating pending contacts:', data);
    io.to(room).emit('UpdatePendingContacts', data);
  });

  socket.on('ChangeUserStatus', (user) => { 
    // eslint-disable-next-line no-console
    console.log('changing user status:', user); // only update user status when user logs in
    io.emit('ChangeUserStatus', user);
  });

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('user disconnected');
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/conversations", conversationsRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

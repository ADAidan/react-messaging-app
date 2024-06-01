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

  socket.on('DeleteConversation', (conversationId) => {
    // eslint-disable-next-line no-console
    console.log('deleting conversation:', conversationId);
    io.emit('DeleteConversation', conversationId);
  });

  socket.on('addConversation', (conversation) => {
    // eslint-disable-next-line no-console
    console.log('adding conversation:', conversation);
    io.emit('addConversation', conversation);
  });

  socket.on('DeleteContact', (data) => { 
    // eslint-disable-next-line no-console
    console.log('deleting contact:', data);
    io.emit('DeleteContact', data);
  });

  socket.on('AcceptContactRequest', (data) => { 
    // eslint-disable-next-line no-console
    console.log('accepting contact request:', data);
    io.emit('AcceptContactRequest', data);
  });

  socket.on('RejectContactRequest', (data) => {
    // eslint-disable-next-line no-console
    console.log('rejecting contact request:', data);
    io.emit('RejectContactRequest', data);
  });

  socket.on('UpdatePendingContacts', (data) => { // Change to SendContactRequest
    // eslint-disable-next-line no-console
    console.log('updating pending contacts:', data);
    io.emit('UpdatePendingContacts', data);
  });

  socket.on('ChangeUserStatus', (user) => { 
    // eslint-disable-next-line no-console
    console.log('changing user status:', user); // only update user status when user logs in
    io.emit('ChangeUserStatus', user);
  });

  socket.on('newMessage', (message) => { 
    // eslint-disable-next-line no-console
    console.log('new message:', message);
    io.emit('newMessage', message);
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

const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const conversationsRouter = require("./routes/conversations");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// eslint-disable-next-line no-use-before-define, no-console
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGODB_URI,
  );
  // eslint-disable-next-line no-console
  console.log("Connected to MongoDB");
}

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

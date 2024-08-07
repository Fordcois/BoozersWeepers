const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require('cors'); 
const JWT = require("jsonwebtoken");

// const postsRouter = require("./routes/posts");
const authenticationRouter = require("./routes/authentication");
const usersRouter = require("./routes/users");
const userdataRouter = require ("./routes/userdata")
const wagersRouter = require("./routes/wagers");
const pintsRouter = require("./routes/pints")
const pubGroupsRouter = require("./routes/pubGroups");

const app = express();

// setup for receiving JSON
app.use(express.json())

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// CORS middleware
app.use(cors({
  origin: ['https://boozersweepers.onrender.com', 'http://localhost:3000','https://www.boozersweepers.frdmedia.co.uk'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// middleware function to check for valid tokens
const tokenChecker = (req, res, next) => {

  let token;
  const authHeader = req.get("Authorization")

  if(authHeader) {
    token = authHeader.slice(7)
  }

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err) {
      console.log(err)
      res.status(401).json({message: "auth error"});
    } else {
      req.user_id = payload.user_id;
      next();
    }
  });
};

// route setup
app.use("/tokens", authenticationRouter);
app.use("/users", usersRouter);
app.use("/userdata", tokenChecker, userdataRouter);
app.use("/wagers", tokenChecker, wagersRouter);
app.use("/pints", tokenChecker, pintsRouter);
app.use("/pubGroups", tokenChecker, pubGroupsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // respond with details of the error
  res.status(err.status || 500).json({message: 'server error'})
});

module.exports = app;

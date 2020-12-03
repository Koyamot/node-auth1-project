const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);
const express = require('express');
const cors = require("cors");

const server = express();

const helmet = require("helmet");



server.use(express.json())
server.use(cors());

server.use(logger)

server.get('/', (req, res) => {
    res.send(`<h2>"Up! Up! And away!!!"</h2>`);
  });


const usersRouter = require("./users/users-router.js")
const authRouter = require("./auth/auth-router.js")



server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

const sessionConfig = {
    name: 'sksession',
    secret: 'myspeshulsecret',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // should be true in production
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore(
      {
        knex: require("../data/connection.js"),
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 1000 * 60 * 60
      }
    )
  }

  server.use(session(sessionConfig));


function logger(req, res, next) {
    console.log(`Method: ${req.method}, Timestamp: [${new Date().toISOString()}], Request URL: "${req.url}"`)
    next();
  }
  
  module.exports = server;
const express = require('express');
const hbs = require("express-handlebars").create({ extname: ".hbs" });
const cookieParser = require('cookie-parser');

const defaultTitle = require("../middlewares/defaultTitle");
const verifyAuth = require('../middlewares/auth');
const userNav = require('../middlewares/userNav');

// usually put as an environement variable
const jwtSecret = "myGreatSecret";
function app(app) {
  app.engine(".hbs", hbs.engine);
  app.set("view engine", ".hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));
  app.use(cookieParser());
  app.use(verifyAuth(jwtSecret));
  app.use(userNav());

  app.use(defaultTitle("SoftUni Accomodation"));
}
module.exports = app;

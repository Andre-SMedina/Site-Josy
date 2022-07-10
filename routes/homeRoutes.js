const express = require("express");
const route = express.Router();
const HomeController = require("../controllers/HomeController");
const checkAuth = require("../helpers/auth").checkAuth;

route.get("/", checkAuth, HomeController.home);

module.exports = route;

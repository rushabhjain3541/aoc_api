module.exports = app => {
  const users = require("../controllers/web_aoc_users.controller.js");

  var router = require("express").Router();

  router.post("/getAocUsersList", users.getAocUsersList);

  app.use('/api/master', (req, res, next) => {
    next(); 
  },router);
};
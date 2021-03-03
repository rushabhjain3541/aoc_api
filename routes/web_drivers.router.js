module.exports = app => {
    const users = require("../controllers/web_drivers.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getDriversList", users.getDriversList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
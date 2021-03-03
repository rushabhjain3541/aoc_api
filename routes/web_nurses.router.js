module.exports = app => {
    const users = require("../controllers/web_nurses.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getNursesList", users.getNursesList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
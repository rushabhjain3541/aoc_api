module.exports = app => {
    const users = require("../controllers/web_aoc_er_staffs.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getAocErStaffsList", users.getAocErStaffsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
module.exports = app => {
    const users = require("../controllers/web_aoc_ems_staffs.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getAocEmsStaffsList", users.getAocEmsStaffsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
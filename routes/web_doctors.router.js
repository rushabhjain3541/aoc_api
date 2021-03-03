module.exports = app => {
    const users = require("../controllers/web_doctors.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getDoctorsList", users.getDoctorsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
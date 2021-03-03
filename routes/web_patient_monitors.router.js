module.exports = app => {
    const users = require("../controllers/web_patient_monitors.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getPatientMonitorsList", users.getPatientMonitorsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
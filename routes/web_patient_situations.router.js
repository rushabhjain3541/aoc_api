module.exports = app => {
    const users = require("../controllers/web_patient_situations.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getPatientSituationsList", users.getPatientSituationsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
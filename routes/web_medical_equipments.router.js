module.exports = app => {
    const users = require("../controllers/web_medical_equipments.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getMedicalEquipmentsList", users.getMedicalEquipmentsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
module.exports = app => {
    const users = require("../controllers/web_ambulance_equipments.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getAmbulanceEquipmentsList", users.getAmbulanceEquipmentsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
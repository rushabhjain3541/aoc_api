module.exports = app => {
    const web_hospitals = require("../controllers/web_hospitals.controller.js");
  
    var router = require("express").Router();
    
    router.post("/getHospitalList", web_hospitals.getHospitalList);
    router.post("/getAllSubDistrictList", web_hospitals.getAllSubDistrictList);

    router.post("/updateHospitalDetail", web_hospitals.updateHospitalDetail);
    router.post("/deleteHospital", web_hospitals.deleteHospital);

    router.post("/getZoneList", web_hospitals.getZoneList);
    router.post("/getAllHospitalList", web_hospitals.getAllHospitalList);

    router.post("/updateZoneDetail", web_hospitals.updateZoneDetail);
    router.post("/deleteZone", web_hospitals.deleteZone);
    
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
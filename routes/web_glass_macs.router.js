module.exports = app => {
    const users = require("../controllers/web_glass_macs.controller.js");
  
    var router = require("express").Router();
  
    router.post("/getGlassMacsList", users.getGlassMacsList);
  
    app.use('/api/master', (req, res, next) => {
      next(); 
    },router);
  };
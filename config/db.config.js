const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost:27017/aocv2_development_db";

db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log("Connected to the database!");
})
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

db.aoc_users = require("../models/aoc_users.model")(mongoose);
db.doctors = require("../models/doctors.model")(mongoose);
db.drivers = require("../models/drivers.model")(mongoose);
db.nurses = require("../models/nurses.model")(mongoose);
db.aoc_er_staffs = require("../models/aoc_er_staffs.model")(mongoose);
db.aoc_ems_staffs = require("../models/aoc_ems_staffs.model")(mongoose);

db.ambulance_equipments = require("../models/ambulance_equipments.model")(mongoose);
db.medical_equipments = require("../models/medical_equipments.model")(mongoose);
db.glass_macs = require("../models/glass_macs.model")(mongoose);
db.patient_monitors = require("../models/patient_monitors.model")(mongoose);
db.patient_situations = require("../models/patient_situations.model")(mongoose);

db.provinces = require("../models/provinces.model")(mongoose);
db.districts = require("../models/districts.model")(mongoose);
db.subdistricts = require("../models/subdistricts.model")(mongoose);

db.hospitals = require("../models/hospitals.model")(mongoose);
db.aoc_zones = require("../models/aoc_zones.model")(mongoose);

module.exports = db;
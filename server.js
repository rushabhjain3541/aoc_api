var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var multer  = require('multer');

const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
// app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({dest:'./uploads/'}).any());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

require('./config/db.config');
require('./routes/index.router')(app);
require('./routes/web_area_management.router')(app);
require('./routes/web_hospitals.router')(app);

require('./routes/web_aoc_users.router')(app);
require('./routes/web_doctors.router')(app);
require('./routes/web_drivers.router')(app);
require('./routes/web_nurses.router')(app);
require('./routes/web_aoc_er_staffs.router')(app);
require('./routes/web_aoc_ems_staffs.router')(app);
require('./routes/web_ambulance_equipments.router')(app);
require('./routes/web_medical_equipments.router')(app);
require('./routes/web_glass_macs.router')(app);
require('./routes/web_patient_monitors.router')(app);
require('./routes/web_patient_situations.router')(app);

module.exports = app;
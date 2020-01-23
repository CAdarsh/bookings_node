const Router = require('express').Router();
const Controller = require('../controllers/makeBooking.js');
Router.get('/MakeBooking', Controller.makeBookings); //date time
Router.post("/MakeBooking", Controller.postMakeBookings);

Router.get('/CheckBookings',Controller.CheckBookings); //date




exports.Router = Router;
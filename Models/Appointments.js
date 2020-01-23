const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = 'mongodb://localhost:27017/appointments';

mongoose.connect(url, {
    useNewUrlParser: true
});

// schema 

const appointmentSchema = new Schema({
    userId: String,
    userName: String,
    paymentStatus: Number,
    time: String,
    Date: String
});
const AppointmentModel = mongoose.model('Appointments',appointmentSchema);

module.exports = AppointmentModel;


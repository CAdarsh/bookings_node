const express = require('express');
const bodyparser = require('body-parser');
const app = express();


app.use(bodyparser.json())
// routes

const Booking = require('./route/makeBooking.js');

app.use('/',Booking.Router);

app.listen('3000',()=>{
    console.log('Connected');
})
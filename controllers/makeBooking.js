const AppointmentModel = require('../Models/Appointments.js');




exports.makeBookings = (req, res) => {
    
    const userId = req.body.UId;
    const appTime = req.body.time;
    const appDate = req.body.date;

    const sampleUser = {
      userId: Math.floor(Math.random() * 100000),
      userName: "Adarsh",
      paymentStatus: 0,
      time: `${appTime}`,
      Date: `${appDate}`
    };

    let appointmentTimings = [];
     AppointmentModel.find({
         Date: `${appDate}`
     }).then((response) => {
        //  console.log(response);
         response.map((appointment) => {
            //  console.log(appointment);
             appointmentTimings.push(appointment.time);
         })
        //  console.log(appTime.indexOf(appointmentTimings));
        //  console.log(appointmentTimings.indexOf(appTime));
         if (appointmentTimings.indexOf(appTime) != -1) {
            res.send({
                statusCode: 200,
                message: "Slot already booked"
            });
            return 0;
         }
         else {
              const newBooking = new AppointmentModel(sampleUser);
              newBooking.save().then((response) => {
                  res.send({
                      message: "Booking confirmed"
                  });
              }).catch((err) => {
                  throw err;
              });
         }
     }).catch((err) => {
         throw err;
     });
   
}

exports.postMakeBookings = (req, res) => {
    console.log(req.body);


    AppointmentModel.find({}).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        throw err;
    })

    res.send(req.body);
}

exports.CheckBookings = (req,res) => {
    const date = req.body.date; 
    const appointmentTimings = [];
    const checkForBookings = (date) => {
        const holidays = ['01102019', '26072019','10112019'];
        console.log(date);
        console.log(holidays.indexOf(date));
        console.log(holidays.indexOf(date) == -1 ? true : false);
        return holidays.indexOf(date)==-1 ? true : false;   
    }
    if (!checkForBookings(date)){
        res.send({
            statusCode: 503,
            error: "The shop/facility is closed on this date"
        });
    }
    else{

        AppointmentModel.find({Date: `${date}`}).then((response)=>{
            response.map((appointment) => {
                appointmentTimings.push(appointment.time)
            })
            console.log(appointmentTimings);
            res.send({
                statusCode: 200,
                appointmentTimings: appointmentTimings
            });
        }).catch((err)=>{
            res.send({
                err: err
            });
        });

        
    }
}

const Appointment = require('../models/doctor_appointment.model');

let response;

exports.add_appointment = function (req, res) {
  let data = {
    patient_name: req.body.patient_name,
    contact: req.body.contact,
    slot: req.body.slot,
    appointment_date: req.body.appointment_date,
    appointment_time: req.body.appointment_time,
    age: req.body.age
  }
  Appointment.create(data, function (err, appointment) {
    if (err) {
      data = { message: err._message };
      res.send(data);
    }
    if (appointment) {
      response = {
        data: appointment,
        message: 'Success'
      };
      res.send(response);
    }
  })
};
exports.appointments_list = function (req, res) {
  let filter = { appointment_date: req.body.slot_date };

  Appointment.find(filter).exec(function (err, list) {
    if (err) return;
    response = {
      data: list,
      message: 'Success'
    };
    res.send(response);
  });
};

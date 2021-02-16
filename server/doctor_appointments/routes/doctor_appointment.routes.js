const express = require('express');
const router = express.Router();

const doctor_appointment = require('../controllers/doctor_appointment.controller');


//routes
router.post('/add_appointment', doctor_appointment.add_appointment);
router.post('/appointment_list', doctor_appointment.appointments_list);

module.exports = router;
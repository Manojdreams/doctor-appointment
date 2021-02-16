const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let doctor_appointments = new Schema({
  patient_name: { type: String, required: true, max: 225 },
  contact: { type: String, required: true, max: 225 },
  slot: { type: String, required: true },
  appointment_date : { type: String, required: true },
  appointment_time: { type: String, required: true },
  age: { type: String, required: true, max: 225 },
});

// Export the model
module.exports = mongoose.model('doctor_appointments', doctor_appointments);



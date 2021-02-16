const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let slots = new Schema({
  from_time: { type: String, required: true, max: 225 },
  to_time: { type: String, required: true, max: 225 },
  slot_date: { type: Date, required: true },
  slot_schedule: { type: String, required: true, max: 225 }
});

// Export the model
module.exports = mongoose.model('slots', slots);



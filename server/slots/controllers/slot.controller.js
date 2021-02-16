const Slots = require('../models/slot.model');
let response;

//add slot
exports.add_solt = function (req, res) {

  let data = {
    from_time: req.body.from_time,
    to_time: req.body.to_time,
    slot_date: req.body.slot_date,
    slot_schedule: req.body.slot_schedule
  }


  Slots.findOne({ from_time: req.body.from_time, slot_date: req.body.slot_date }, function (err, slot) {
    if(err){
      console.log(err);
      response = {
        message: err
      }
      res.send(response);
    }
    else{
      if(slot){
        response = {
          message: "Slot already exists"
        }
        res.send(response);
      }
      else{
        Slots.create(data, function (err, slot_data) {
          if (err) {
            response = { message: err._message };
            res.send(response);
          }
          else if(slot_data){
            response = { data:slot_data, message: 'Success' };
            res.send(response);
          }
        })
      }
    }
  })
};


exports.solt_list = function (req, res) {
  let filter = { slot_date: req.body.slot_date};

  Slots.find(filter).exec(function (err, list) {
    if(err){
      response = { message: err._message };
      res.send(response);
    }
    if(list){
      response = { data:list,message: 'Success' };
      res.send(response);
    }
  })
};





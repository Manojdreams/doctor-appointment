const express = require('express');
const router = express.Router();

const slots = require('../controllers/slot.controller');


//routes
router.post('/add_slot', slots.add_solt);
router.post('/slot_list', slots.solt_list);

module.exports = router;
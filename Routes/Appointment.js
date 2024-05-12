const express = require('express');
const router = express.Router();
const { addAppointment, getAllAppointments, updateStatus  } = require('../Controllers/Appointment');

router.post('/addappointment', addAppointment);
router.get('/getallappointments', getAllAppointments);
router.post('/updateStatus', updateStatus)

module.exports = router;

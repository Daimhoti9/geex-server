const express = require('express');
const router = express.Router();
const { addJob, getJob, getAllJobs, deleteJob, editJob, transferJob, transferJobThroughNotification, updateStatus} = require('../Controllers/jobController');

router.post('/addjob', addJob);
router.get('/getalljobs', getAllJobs);
router.get('/getjob/:id', getJob);
router.delete('/deletejob/:id', deleteJob);
router.post('/editjob/:id', editJob);
router.post('/updatestatus/:id', updateStatus);
router.post('/transferjob', transferJob)
router.post('/transferjobnotification', transferJobThroughNotification)

module.exports = router;

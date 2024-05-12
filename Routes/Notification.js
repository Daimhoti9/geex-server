const express = require('express');
const router = express.Router();
const { addNotification, getNotification, getAllNotifications, deleteNotification, editNotification, generateNotification, updateStatus } = require('../Controllers/notificationController');

router.post('/addnotification', addNotification);
router.get('/getallnotifications', getAllNotifications);
router.get('/getnotification/:id', getNotification);
router.delete('/deletenotification/:id', deleteNotification);
router.put('/editnotification/:id', editNotification);
router.put('/updatestatus/:id', updateStatus);
router.post('/generateNotification', generateNotification);

module.exports = router;

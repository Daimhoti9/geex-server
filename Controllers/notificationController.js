const Notification = require('../Models/Notification');
const Agent = require('../Models/Agent');
const Job = require('../Models/Job');

const addNotification = async (req, res) => {
    try {
        console.log("Adding notification");
        const {
            companyName,
            businessUniqueNumber,
            contactPerson,
            address,
            city,
            zipCode,
            employee,
            jobProfile,
            fromDate,
            toDate,
            recommendingEmail,
            creationDate
        } = req.body;

        const agent = await Agent.findOne({email:recommendingEmail})

        const job = new Job({
            company: companyName,
            category: jobProfile,
            position: jobProfile,
            location: city,
            period: "Nil",
            qualification: "Nil",
            permit: "Ni;",
            amenities: "Nil",
            overtime: "as per country's law",
            available: false
        });

        const savedJob = await job.save();

        console.log(agent, job);

        const notification = new Notification({
            agent: agent,
            job: savedJob,
            recruiter: null,
            creationDate: creationDate
        });

        const savedNotification = await notification.save();
        console.log("Notification saved successfully");
        res.status(200).json(savedNotification);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedNotification = await Notification.findByIdAndDelete(id);
        res.status(200).json(deletedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedNotificationData = req.body;
        const updatedNotification = await Notification.findByIdAndUpdate(id, updatedNotificationData, { new: true });
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNotification = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await Notification.findById(id);
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const generateNotification = async (req, res) => {
    try {
        const {agent, job, recruiter, creationDate} = req.body;
        const notification = new Notification({
            agent: agent,
            job: job,
            recruiter: recruiter,
            creationDate: creationDate
        });
        const savedNotification = await notification.save();
        console.log("Notification saved successfully", savedNotification);
        res.status(200).json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.params.status;
        const notification = await Notification.findById(id);
        notification.status = status;
        const updatedNotification = await Notification.findByIdAndUpdate(id, notification, { new: true });
        console.log(updatedNotification);
        res.status(200).json(updatedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addNotification,
    getAllNotifications,
    deleteNotification,
    editNotification,
    getNotification,
    generateNotification,
    updateStatus,
};

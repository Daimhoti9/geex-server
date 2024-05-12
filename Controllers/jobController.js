const Job = require('../Models/Job');
const Admin = require('../Models/User')
const Recruiter = require('../Models/Recruiter');
const Invoice = require('../Models/Invoice');
const { default: mongoose } = require('mongoose');
const Agent = require('../Models/Agent');

const addJob = async (req, res) => {
    try {
        console.log("adding job");
        const {company, category, position, location, period, qualification, permit, amenities, overtime, available} = req.body;

        const job = new Job({
            company: company,
            category: category,
            position: position,
            location: location,
            period: period,
            qualification: qualification,
            permit: permit,
            amenities: amenities,
            overtime: overtime,
            available: available
        });
        const savedJob = await job.save();
        console.log("saved job")
        res.status(200).json(savedJob);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteJob = async (req, res) => {
    try{
        const id = req.params.id;
        const agent = await Job.findByIdAndDelete(id);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const editJob = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedAgent = req.body;
        const agent = await Job.findByIdAndUpdate(id, updatedAgent);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateStatus = async (req, res) => {
    try{
        const id = req.params.id;
        const job = await Job.findById(id);
        job.available = true;
        job.save();
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const getJob = async (req, res) => {
    try{
        const id = req.params.id;
        const agent = await Job.findById(id);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const transferJob = async (req, res) => {
    try {
        const {job, recruiter, mail, role} = req.body;

        console.log(job, recruiter, mail, role);
        
        recruiter.dateEdited = Date.now();
        recruiter.status = 'Inactive';
        recruiter.job = job; 
        job.available = false 

        const updatedReqruiter = await Recruiter.findByIdAndUpdate(recruiter._id, recruiter);
        const updatedJob = await Job.findByIdAndUpdate(job._id, job);

        const admin = await Admin.findOne({email: mail});

        const invoice = new Invoice({
            invoiceNumber: 'abc324-01',
            job: updatedJob,
            admin: admin,
            amount: 30,
            invoiceFor: role,
        })
        const savedInvoice = await invoice.save()
        res.status(200).json({message: 'Job transferred Successfully'}, savedInvoice);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const transferJobThroughNotification = async (req, res) => {
    try {
        const notification = req.body.notification;
        const job = await Job.findById(notification.job);
        const recruiter = await Recruiter.findById(notification.recruiter);
        const agent = await Agent.findById(notification.agent)
        
        recruiter.dateEdited = Date.now();
        recruiter.status = 'Inactive';
        recruiter.job = job; 
        job.available = false 

        const updatedReqruiter = await Recruiter.findByIdAndUpdate(recruiter._id, recruiter);
        const updatedJob = await Job.findByIdAndUpdate(job._id, job);

        const invoice = new Invoice({
            invoiceNumber: 'abc324-01',
            job: updatedJob,
            agent: agent,
            amount: 30,
            invoiceFor: 'agent',
        })
        const savedInvoice = await invoice.save()
        res.status(200).json({message: 'Job transferred Successfully'}, savedInvoice);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addJob, getJob, getAllJobs, deleteJob, editJob, transferJob, transferJobThroughNotification, updateStatus};
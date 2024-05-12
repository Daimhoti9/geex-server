const Recruiter = require('../Models/Recruiter');
const generateCVPDF=require("../Utils/CVGenerator/generateCVpDF")
const { default: mongoose } = require('mongoose');

const addRecruiter = async (req, res) => {
    try {
        console.log("signing Up Recruiter!!!");
        const {id, firstName, lastName, email, coverLetter, status, passport, dateOfBirth, birthPlace, gender, nationality, issuance, expiry, serviceFee} = req.body;

        const recruter = await Recruiter.findOne({email: email});

        if(recruter) {
             return res.status(500).json({
                message: 'Recruiter with this email already exists!'
            });
        }

        const recruiter = new Recruiter({
            firstName: firstName,
            lastName: lastName,
            email: email,
            passport: passport,
            dateOfBirth: dateOfBirth,
            birthPlace: birthPlace,
            gender: gender,
            nationality: nationality,
            issuance: issuance,
            expiry: expiry,
            id: id,
            coverLetter: coverLetter,
            status: status,
            serviceFee: serviceFee,
            informationProgress: 'basic'
        });
        const savedRecruiter = await recruiter.save();
        res.status(200).json(savedRecruiter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const uploadRecruiterDocs = async (req, res) => {
    try {
        const { recuiterEmail} = req.body;
        console.log(recuiterEmail)
        // Find the recruiter based on the provided email
        const recruiter = await Recruiter.findOne({ email: recuiterEmail });
        if (!recruiter) {
            return res.status(404).json({ message: `Recruiter with email ${recuiterEmail} not found.` });
        }
        // Extract filenames from uploaded files
        const fileNames = req.files.map(file => file.filename);
        // Add the filenames to the recruiter's docs array
        recruiter.docs = [...recruiter.docs,...fileNames];
        // Save the updated recruiter document
        if(recruiter.informationProgress == 'documents') {
            console.log('updating background');
            recruiter.informationProgress = 'background';
        } else {
            console.log('updating documents');
            recruiter.informationProgress = 'documents';
        }
        const savedRecruiter = await recruiter.save();
        // Log and send success response
        console.log(`Files uploaded for recruiter with email ${recuiterEmail}:`, fileNames);
        res.status(200).json(savedRecruiter);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

module.exports = uploadRecruiterDocs;


const getAllRecruiters = async (req, res) => {
    try{
        const recruiters = await Recruiter.find();
        res.status(200).json(recruiters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteRecruiter = async (req, res) => {
    try{
        const id = req.params.id;
        const recruiter = await Recruiter.findByIdAndDelete(id);
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const editRecruiter = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedRecruiter = req.body;
        const recruiter = await Recruiter.findByIdAndUpdate(id, updatedRecruiter);
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getRecruiter = async (req, res) => {
    try{
        const id = req.params.id;
        const recruiter = await Recruiter.findById(id);
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const generateCV = async (req, res) => {
    try{
        const {contactDetails, careerGoals, education, workExperience, skills, skillsInfo, certificates, languages, memberships, volunteerExperinces, achievements, references, problemSolving, teamWork, customerService, adaptibility, companyMotivation, additionalQuestions} = req.body;
        const cvData={contactDetails, careerGoals, education, workExperience, skills, skillsInfo, certificates, languages, memberships, volunteerExperinces, achievements, references, problemSolving, teamWork, customerService, adaptibility, companyMotivation, additionalQuestions}
        // console.log('Contact Details', contactDetails);
        // console.log('Career Goals', careerGoals);
        // console.log('Education', education);
        // console.log('Work Experience', workExperience);
        // console.log('Skills', skills);
        // console.log('Skills Information', skillsInfo);
        // console.log('Certificates', certificates);
        // console.log('Languages', languages);
        // console.log('Memberships', memberships);
        // console.log('Volunteer Experiences', volunteerExperinces);
        // console.log('Achievements', achievements);
        // console.log('References', references);
        // console.log('Problem Solving', problemSolving);
        // console.log('Team Work', teamWork);
        // console.log('Customer Service', customerService);
        // console.log('Adaptibility and Learning', adaptibility);
        // console.log('Company Motivation', companyMotivation);
        // console.log('Additional Questions', additionalQuestions);
        // console.log("generating and saving the pdf")
        const fileName=generateCVPDF(cvData,'./public/CVs/'+cvData.contactDetails.email+'_cv.pdf')
        console.log("CV saved with : "+fileName)
        res.status(200).json("Data Received");
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { recuiterEmail} = req.body;
        console.log(recuiterEmail)
        // Find the recruiter based on the provided email
        const recruiter = await Recruiter.findOne({ email: recuiterEmail });
        if (!recruiter) {
            return res.status(404).json({ message: `Recruiter with email ${recuiterEmail} not found.` });
        }
        recruiter.informationProgress = 'completed';
        const savedRecruiter = await recruiter.save();
        res.status(200).json(savedRecruiter);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addRecruiter, getRecruiter, getAllRecruiters, deleteRecruiter, editRecruiter, generateCV, uploadRecruiterDocs, updateStatus};
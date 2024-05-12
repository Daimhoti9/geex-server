const express = require('express');
const router = express.Router();
const uploadRecruiterDocsMiddleWhere=require("../middlewares/uploadRecuitersDocs")
const uploadCVMiddleware=require("../middlewares/uploadCVMiddleware")

const { addRecruiter, getRecruiter, getAllRecruiters, deleteRecruiter, editRecruiter, generateCV, uploadRecruiterDocs, updateStatus } = require('../Controllers/recruiterController');

router.post('/addrecruiter', addRecruiter);
router.get('/getallrecruiters', getAllRecruiters);
router.get('/getrecruiter/:id', getRecruiter);
router.delete('/deleterecruiter/:id', deleteRecruiter);
router.post('/editrecruiter/:id', editRecruiter);
// router.post('/generateCV', generateCV);
router.post('/CVs', uploadCVMiddleware,async (req, res)=>{
    console.log("CV Recieved")
    res.status(200).json({message:"Done"});
});




router.post('/uploadRecruiterDocs',uploadRecruiterDocsMiddleWhere, uploadRecruiterDocs);
router.post('/updateStatus', updateStatus);


module.exports = router;

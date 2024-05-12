const Agent = require('../Models/Agent');
const {default: mongoose} = require('mongoose');

const addAgent = async (req, res) => {
    try {
        const {id, firstName, lastName, mobile, email, comission, agentType} = req.body;

        const stringLength = 8;
        const randomString = generateRandomString(stringLength);
        console.log(randomString);
              

        const agent = new Agent({
            id: id,
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            comission: comission,
            agentType: agentType,
            password: randomString,
            //profileImage: profileImage,
            //cv: cv,
        });
        const savedAgent = await agent.save();
        res.status(200).json(savedAgent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
  
    return result;
  }
    

const getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const agent = await Agent.findByIdAndDelete(id);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const editAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedAgent = req.body;
        const agent = await Agent.findByIdAndUpdate(id, updatedAgent);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAgent = async (req, res) => {
    try {
        const id = req.params.id;
        const agent = await Agent.findById(id);
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getAgentByEmail = async (req, res) => {
    try {
        console.log(req.query.email);
        const email = req.query.email;
        const agent = await Agent.findOne({email: email});
        res.status(200).json({
            agent: agent,
            message: 'Agent retrieved'
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {addAgent, getAgent, getAllAgents, deleteAgent, editAgent, getAgentByEmail};
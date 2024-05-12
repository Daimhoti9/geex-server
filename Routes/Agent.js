const express = require('express');
const router = express.Router();
const { addAgent, getAgent, getAllAgents, deleteAgent, editAgent, getAgentByEmail} = require('../Controllers/agentController');

router.post('/addagent', addAgent);
router.get('/getallagents', getAllAgents);
router.get('/getagent/:id', getAgent);
router.delete('/deleteagent/:id', deleteAgent);
router.post('/editagent/:id', editAgent);
router.get('/getAgentByEmail', getAgentByEmail)

module.exports = router;

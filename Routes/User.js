const express = require('express');
const router = express.Router();
const { signUp, signIn, getUser, getUserByEmail } = require('../Controllers/userController');

router.post('/registration', signUp);
router.post('/login', signIn);
router.get('/getuser/:id', getUser);
router.get('/getuser', getUserByEmail);

module.exports = router;

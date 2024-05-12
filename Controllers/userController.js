const User = require('../Models/User');
const Agent = require('../Models/Agent')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

const signUp = async (req, res) => {
    try {
        console.log("signing Up!!!");

        const {email, password,role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({
            email: email,
            password: hashedPassword,
            role:role,
        });
        const savedAdmin = await admin.save();
        res.status(200).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const signIn = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const admin = await User.findOne({email: email});

        console.log('here is the admin: ',admin);

        if (admin) {
            const isPasswordValid = password == admin.password;
            if (!isPasswordValid) {
                
            } else {
                const token = 'abcd1234'
                const email1 = admin.email;
                const role = 'admin';
                return res.status(200).json({ 
                    token,
                    email,
                    role,
                });
            }
        } 

        const agent = await Agent.findOne({email: email});

        if (agent) {
            if (password == agent.password) {
                const token = 'abcd1234';
                const email = agent.email;
                const role = 'agent';
                return res.status(200).json({ 
                    token,
                    email,
                    role,
                });
            } else {
                console.log(password, agent.password);
                return res.status(401).json({ message: 'Agent Password Invalid!' });
            }
        } 

        return res.status(401).json({ message: 'Invalid Credentials!' });

    } catch (error) {
        console.log('here',error)
        return res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserByEmail = async (req, res) => {
    try {
        console.log(req.query.email);
        const email = req.query.email;
        const user = await User.findOne({email:email});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = { signUp, signIn, getUser, getUserByEmail };
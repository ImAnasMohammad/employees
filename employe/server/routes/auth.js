const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

const {emailValidation} = require('../utils/validations')


const JWT_SECRET = process.env.JWT_SECRET;


router.post('/login', async (req, res) => {
    try {
        
        const email = req.body?.email ?? '';
        const password = req.body?.password ?? '';
        
        if (!emailValidation(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }


        const token = jwt.sign(
            { id: user._id, name: user.name },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ message: 'Login successful', token,name:user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;




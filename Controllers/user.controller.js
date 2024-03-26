const express = require('express');
const UserModel = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../Config/db')

const UserController = express.Router();

UserController.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists. Please choose another email.' });
        }

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }

            try {
                const newUser = await UserModel.create({
                    name: name,
                    email: email,
                    password: hash
                });
                res.status(201).json({ message: 'User created successfully', user: newUser });
            } catch (error) {
                console.error('Error creating user:', error);
                res.status(500).json({ error: 'Failed to create user' });
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

UserController.post('/login', async (req,res) => {
    const {email , password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'email, and password are required' });
        }
        const User = await UserModel.findOne({ email });
        if (!User) {
            return res.status(409).json({ error: 'User not exists. Please register first.' });
        }
        bcrypt.compare(password,User.password, async (err,result) => {
            try {
                if(err){
                    return res.status(401).json({ error: 'Invalid password' });
                }
                const token = jwt.sign({userId:User._id},JWT_SECRET)
                res.status(200).json({ message: 'Login successful', token:token, name: User.name });
            } catch (error) {
                console.error('Error logging in user:', error);
                res.status(500).json({ error: 'Failed to log in' });
            }
        })

    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }

})

module.exports = UserController;

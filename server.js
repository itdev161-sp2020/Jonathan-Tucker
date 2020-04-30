import express from "express";
import connectDatabase from "./config/db";
import {check, validationResult } from 'express-validator';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from './models/User';
import auth from './my-app/src/middleware/auth';


// Initialize express application
const app = express();

//Connect database
connectDatabase();

//Configure Middleware
app.use(express.json({ extended: false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//API endpoints
/**
 * @route Get/
 * @desc Test endpoint
 */
app.get('/',(req, res) =>
res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc Register user
 */
app.post('/api/users',
[
    check('name', 'Please enter your name'). not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],

async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array() });
    } else {
        const {name, email, password} = req.body;
        try{
        let user = await User.findOne({email: email});
        if (user) {
            return res
        .status(400)
        .json({errors: [ {msg: 'user already exists'}]});
    }
    user = new User({
        name: name,
        email: email,
        password: password
    });

    
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);

await user.save();
res.send('User successfully registered');
    }catch (error){
        res.status(500).send('Server error');
    }
  }
}
);
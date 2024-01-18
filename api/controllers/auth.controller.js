import User from "../models/user.model.js";
import bycryptjs from 'bcryptjs';
import { errorHandle } from "../utils/error.js";

export const signup = async (req, res, next)=>{
    const {username, email, password } = req.body;
    const hashedPassword = bycryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json("User created successfully!");        
    } catch (error) {
        // res.status(500).json(error.message);
        // next(errorHandle(550, 'Error from the function'))
        next(error)
    }

};
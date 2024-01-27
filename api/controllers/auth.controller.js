import User from "../models/user.model.js";
import bycryptjs from 'bcryptjs';
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next)=>{
    try {
        const {username, email, password } = req.body;
        const hashedPassword = bycryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword});
        await newUser.save();
        res.status(201).json("User created successfully!");        
    } catch (error) {
        // res.status(500).json(error.message);
        // next(errorHandle(550, 'Error from the function'))
        next(error)
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(errorHandle(404, 'User not found!'));
        const validPassword = bycryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandle(401, 'Worng credentials!'));
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest} = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
        //expires: new Date(Date.now() + 24*60*60*10)}
    } catch (error) {
        next(error)
    }
}
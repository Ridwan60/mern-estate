import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js'
import userAuth from "./routes/auth.route.js"

dotenv.config();

mongoose.connect(process.env.MONGO).then(() =>{
    console.log("Conneced to MongoBD");
}).catch((err) =>{
    console.log("err")
});

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
    }
);

app.use('/api/user', userRoute);
app.use('/api/auth', userAuth);

//middleware to handle errors
app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500; //statusCode from the error
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
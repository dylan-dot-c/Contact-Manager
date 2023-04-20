import express from 'express';
import User from '../models/user.model.js';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


dotenv.config();
const userRouter = express.Router();

userRouter.post("/data", async function(req, res) {    
    try {
        const {token} = req.body;    
        const decoded = jwt.verify(token, process.env.ENCRYPTION_KEY);
        const { username } = decoded;
        const user = await User.findOne({ username });
        res.send(user);
    } catch (error) {
        res.status(404).send("User not found!");
    }
});


export default userRouter;

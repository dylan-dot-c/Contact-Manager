import express from "express";
import UserSchema from "../models/user.model.js";
import jwt from "jsonwebtoken"
import mongodb from "../database/mongodb.js";
import dotenv from 'dotenv'

const authRouter = express.Router();


mongodb.connectToDatabase();

dotenv.config();


authRouter.post('/login', async function (req, res) {

  const { username, password } = req.body;
  
  try {
    const user = await UserSchema.findOne({ username });
    
    if (!user) {
      return res.status(404).send("User not found");
    } 
    
    const result = await user.comparePassword(password);

    if (!result) {
      return res.status(401).send("Incorrect password")
    }
    
    const token = jwt.sign({ username }, process.env.ENCRYPTION_KEY);
    
    res.json({ token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});





authRouter.post('/register', async function (req, res) {

  try {
    const { username, password, firstName, lastName } = req.body;

  
    const newUser = new UserSchema({
      username,
      password,
      firstName,
      lastName
    });

    
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default authRouter;
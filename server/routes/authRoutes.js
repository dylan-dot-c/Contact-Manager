import express from "express";
import UserSchema from "../models/user.model.js";
import jwt from "jsonwebtoken"
import mongodb from "../database/mongodb.js";

const authRouter = express.Router();
mongodb.connectToDatabase();


authRouter.post('/login', async function(req, res) {

    const {username , password} = req.body;
    const user = await UserSchema.findOne({username});
    
    if(!user){
      res.status(404).send("user not found");
    }else{

     const result = await user.comparePassword(password);
    
     if(!result){
        res.status(401).send("incorrect password")
     }
     const token = jwt.sign({username}, 'DYLAN');
     res.json({ token , user : user});
    }
});



authRouter.post('/register', async function(req, res) {
  try {
    const { username, password , firstName, lastName } = req.body;
    const newUser = new UserSchema({ username, password , firstName, lastName });  
    await newUser.save(); 
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


authRouter.get("/user/:username" , )

authRouter.get("/username-duplicate" , async function(req,res){
  const {username} = req.body;
  const users = await UserSchema.find({username}).lean();
  
  console.log("Checking for duplicate emails")
})

export default authRouter;
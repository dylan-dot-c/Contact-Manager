import express from 'express';
import mongodb from '../database/mongodb.js';
import mongoose from 'mongoose';
import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";
import verifyToken from '../utils/verifyToken.js';

import dotenv from 'dotenv';

dotenv.config()
const contactRouter = express.Router();



contactRouter.get("/fetch/:_id",   async (req, res) => {
  const { _id } = req.params;
  const user = await User.findOne({ _id });

  if (!user) {
    return res.status(404).send('User not found');
  }

  try {
    const userWithContacts = await User.findById(user._id).populate('contacts');

    const userContacts = userWithContacts.contacts;
    res.status(200).json(userContacts);
  } catch (error) {
    res.status(500).send('Error populating contacts');
  }
});

contactRouter.post("/add/:_id", async function (req, res) {
  
  
  const { _id } = req.params;
  const {
    firstName,
    lastName,
    phone,
    imageUrl,
    relationship,
  } = req.body;

  const newContact = new Contact({
    firstName,
    lastName,
    phone,
    imageUrl,
    relationship,
  });

  newContact.save();

  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { $push: { contacts: newContact._id } },
      { new: true }
    );
    

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})





export default contactRouter;
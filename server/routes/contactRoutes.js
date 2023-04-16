import express from 'express'
import mongodb from '../database/mongodb.js';
import Contact from "../models/contact.model.js"
import User    from "../models/user.model.js"


mongodb.connectToDatabase();

const contactRouter = express.Router();

contactRouter.get("/contacts/:username", async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

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

contactRouter.post("/contacts/:username", async function (req, res) {

  const { username } = req.params;
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
      { username },
      { $push: { contacts: newContact._id } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'JamariistheGoat', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


export default contactRouter;
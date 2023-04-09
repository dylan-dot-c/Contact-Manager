import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Contact from "./models/contact.model.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/contacts", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/create", (req, res) => {
  const {
    firstname: firstName,
    lastname: lastName,
    phone,
    imageurl: imageUrl,
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
});

app.get("/contacts", async (req, res) => {
  const contacts = await Contact.find().exec();
  res.json(contacts);
});

app.get("/", (req, res) => {
  res.send("homepage :)");
});

app.listen(3000, () => {
  console.log("server started on PORT 3000");
});

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  imageUrl: String,
  relationship: String,
});

export default mongoose.model("Contact", contactSchema);
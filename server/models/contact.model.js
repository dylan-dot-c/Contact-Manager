import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name.'],
    trim: true, 
    minlength: [2, 'First name must be at least 2 characters long.'],
    maxlength: [50, 'First name cannot exceed 50 characters.'],
    lowercase : true
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name.'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long.'],
    maxlength: [50, 'Last name cannot exceed 50 characters.'],
    lowercase : true
  },
  phone: {
    type: String,
    required: [true, 'Please enter your phone number.'],
    trim: true,
    minlength: [10, 'Phone number must be at least 10 digits long.'],
    maxlength: [20, 'Phone number cannot exceed 20 digits.']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please enter an image URL.'],
    trim: true,
  },
  relationship: {
    type: String,
    required: [true, 'Please enter your relationship.'],
    trim: true,
    lowercase : true
  }
});


export default mongoose.model("Contact", contactSchema , "contacts");

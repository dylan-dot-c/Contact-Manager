import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact",
    required: true
  }],
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 20
  }
});


userSchema.pre("save", function(next){ 
  const user = this;
  if (!user.isModified('password')) return next();
  
  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);
  
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
  
          user.password = hash;
          next();
      });
    });
  });
  

userSchema.methods.comparePassword = async function (candidatePassword) {
  try{  
    const isMatching = await bcrypt.compare(candidatePassword, this.password);
    return isMatching;
  }
  catch(error){
    console.error(error);
  }
  
};


export default mongoose.model("User", userSchema , "usersDatabase");

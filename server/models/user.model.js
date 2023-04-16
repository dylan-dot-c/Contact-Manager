import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  username: { type: String, required: true },
  password: { type: String, unique: true, required: true },
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

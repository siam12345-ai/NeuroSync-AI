const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

name:{
type:String,
required:true,
trim:true
},

email:{
type:String,
required:true,
unique:true,
trim:true,
lowercase:true
},

password:{
type:String,
required:true,
minlength:6
},
resetPasswordToken:{
  type:String
},

resetPasswordExpires:{
  type:Date
},

role:{
type:String,
enum:["user","teacher","admin"],
default:"user"
}

},
{
timestamps:true
});

module.exports = mongoose.model(
"User",
userSchema
);
const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
    phone : {
        type:String,
    },
    alternatePhone:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    address:{
        type:String
    },
    pincode:{
        type:String
    }
})

module.exports = mongoose.model("user", userSchema);
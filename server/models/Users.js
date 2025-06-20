const mongoose = require("mongoose");

const userDataSchema =new mongoose.Schema({
    firstName:{
        type : String,
        required:true
    },
    lastName:{
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

const UsersData = mongoose.model('UsersData',userDataSchema);
module.exports = UsersData;

const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"username is requried"]
    },
    email:{
        type:String,
        require:[true,'email address is required']
    },
    password:{
        type:String,
        require:[true,'password is requred']
    },
    blogs:[ 
        {
            type:mongoose.Types.ObjectId,
            ref:'Blog',
        }
        
    ]
},{timestamps: true})

const userModel = mongoose.model('User',User);

module.exports = userModel;


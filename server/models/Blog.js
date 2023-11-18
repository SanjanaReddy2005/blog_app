const mongoose = require("mongoose")

const Blog = new mongoose.Schema({
    title:{
        type:String,
        require:[true,'title is required']
    },
    description:{
        type:String,
        require:[true,'description is required']
    },
    image:{
        type:String,
        require:[true,'image is required']
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require:[true,'user is required']
    }
},{timestamps:true});

const blogModel = mongoose.model('Blog',Blog);

module.exports = blogModel;
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const blogSchema =new Schema({
    Title:{
        type:String,
        require:[true, "Title Is Require"]
    },
    description:{
        type:String,
        require:[true, "description Is Require"]
    
    },
    imageUrl:{
        type: String,
        require:[true, "Blog Image Require"]
    },
    isTopBlog:{
        type:Boolean,
        default:false
    },
},{ timestamps: true});

module.exports = mongoose.model("Blog",blogSchema);
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const adminSchema =new Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNo:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
},{ timestamps: true});

module.exports = mongoose.model("Admin",adminSchema);

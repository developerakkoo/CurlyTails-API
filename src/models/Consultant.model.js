const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const ConsultantSchema =new Schema({
    Name:{
        type:String,
        require:[true, "Name Is Require"],
    },
    expertise:{
        type:String,
        require:[true, "expertise Is Require"]
    },
    description:{
        type:String,
        require:[true, "description Is Require"]
    },
    imageUrl:{
        type: String
    },
    ratings:{
        type:Number,
        require:true,
        default:0
    },
    isActive:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isTopConsultant:{
        type:Boolean,
        default:false
    },
},{ timestamps: true});

module.exports = mongoose.model("Consultant",ConsultantSchema);
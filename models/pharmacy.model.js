const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const pharmacySchema =new Schema({
    BrandName:{
        type:String,
        require:true,
    },
    medicineName:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:Number,
        require:true,
    },
    imageUrl:{
        type: String
    },
    Stock:{
        type:Number,
        default:0
    },
    inStock:{
        type:Boolean,
        default:false
    },
    price:{
        type:String,
        require:true,
    },
},{ timestamps: true});

module.exports = mongoose.model("Pharmacy",pharmacySchema);
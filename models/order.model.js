const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const OrderSchema =new Schema({
    OrderId:{
        type:String,
        require:[true, "Title Is Require"]
    },
    BillingId:{
        type:String,
        require:[true, "Title Is Require"]
    },
    userId:{
        type:String,
        require:[true, "Title Is Require"],
        ref:'User'
    },
    orderItems:[
        { }
    ],
    TotalItems:{
        type:Number,
        default:0
    },
    SubTotal:{
        type:Number,
        default:0
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
},{ timestamps: true});

module.exports = mongoose.model("Order",OrderSchema);
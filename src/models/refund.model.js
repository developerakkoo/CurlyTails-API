const mongoose = require('mongoose');
const {status} = require('../utils/refundStatus')
const Schema = mongoose.Schema;


const refundSchema = new Schema({
    userId:{
        type: String,
        required: [true, 'UserId is required']
    },

    orderId:{
        type: String,
        required: [true, 'OrderId is required'],
        ref:'Order'
    },

    description:{
        type: String,
        required: [true, 'Description is required']
    },

    refundStatus:{
        type: String,
        default:status.InProcess
    }
},{ timestamps: true})


module.exports = mongoose.model('Refund', refundSchema);
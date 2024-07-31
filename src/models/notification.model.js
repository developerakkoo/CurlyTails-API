const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
    userId:{
        type: String,
        required: [true, 'UserId is required']
    },


    message:{
        type: String,
        required: [true, 'Description is required']
    },
},{ timestamps: true})


module.exports = mongoose.model('notification', notificationSchema);
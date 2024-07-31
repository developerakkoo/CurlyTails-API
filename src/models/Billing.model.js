const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const billingSchema = new Schema({
    
    invoiceNumber:{
        type: String,
        //required: [true, 'Invoice number is required']
    },

    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
},
    cartId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Cart' 
},
    amount: { 
        type: Number, 
    },
    paymentStatus: { 
        type: String 
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Billing', billingSchema);
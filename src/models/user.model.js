const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
    {
        name: {
            type: String,
            // require:true,
        },
        email: {
            type: String,
            // require:true,
            // unique:true
        },
        phoneNo: {
            type: Number,
            require: true,
        },
        // address:{
        //     type:String,
        //     require:true,
        // },
        password: {
            type: String,
            // require:true,
        },
        isActive: {
            type: Boolean,
            default: false,
            require: true,
        },
        isBlock: {
            type: Boolean,
            default: false,
            require: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

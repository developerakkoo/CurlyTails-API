const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const categorySchema =new Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true
    },
    subCategoryId:{
        type:String,
    },
    isTopCategory:{
        type:Boolean,
        default:false
    },

},{ timestamps: true});

module.exports = mongoose.model("Category",categorySchema);
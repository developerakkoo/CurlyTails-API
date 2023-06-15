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

},{ timestamps: true});

module.exports = mongoose.model("Category",categorySchema);
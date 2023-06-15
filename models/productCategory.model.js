const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const productCategorySchema =new Schema({
    CategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:"subCategory"
    },
    name:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true
    },

},{ timestamps: true});

module.exports = mongoose.model("productCategory",productCategorySchema);
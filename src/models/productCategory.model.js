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
    },
    description:{
        type:String,
        require:true
    },
    isTopProductCategory:{
        type:Boolean,
        default:false
    },
    isTrendingProductCategory:{
        type:Boolean,
        default:false
    },

},{ timestamps: true});

module.exports = mongoose.model("productCategory",productCategorySchema);
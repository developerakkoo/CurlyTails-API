const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const productSchema =new Schema({
    CategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:"subCategory"
    },
    productCategoryId:{
        type:Schema.Types.ObjectId,
        ref:"productCategory"
    },
    name:{
        type:String,
        require:true,
    },
    brand:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    },
    LifeStage:{
        type:String,
        require:true
    },
    BreedSize:{
        type:String,
        require:true
    },
    flavor:{
        type:String,
        require:true
    },
    vegNonVeg:{
        type:String,
        require:true
    },
    size:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    images:{
        type:Array,
        default:[]
    },
    isTrendingProduct:{
        type:Boolean,
        default:false
    },
    isTopProduct:{
        type:Boolean,
        default:false
    },
},{ timestamps: true});


module.exports = mongoose.model("Product",productSchema);
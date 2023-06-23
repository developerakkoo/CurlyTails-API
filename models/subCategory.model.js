const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const subCategorySchema =new Schema({
    CategoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
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
    isTopSUBCategory:{
        type:Boolean,
        default:false
    },
    isTrendingSUBCategory:{
        type:Boolean,
        default:false
    },

},{ timestamps: true});

module.exports = mongoose.model("subCategory",subCategorySchema);
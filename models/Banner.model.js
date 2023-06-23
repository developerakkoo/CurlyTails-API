const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const BannerSchema = new Schema({
    imageUrl:{
        type: String,
        required: [true, "Banner Image Require"]
    },
    isTopBanner:{
        type:Boolean,
        default:false
    },
    isTrendingBanner:{
        type:Boolean,
        default:false
    },
},{timestamps: true});

module.exports = mongoose.model("Banner",BannerSchema);
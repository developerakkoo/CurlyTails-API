const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const BannerSchema = new Schema({
    imageUrl:{
        type: String,
        required: [true, "Banner Image Require"]
    }

},{timestamps: true});

module.exports = mongoose.model("Banner",BannerSchema);
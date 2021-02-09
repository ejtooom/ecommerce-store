import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    category: {type: String, required: false},
    subcategory: {type: String, required: false},
    image: {type: String, required: true},
    link: {type: String, required: false},
    }, 
    {
    timestamps: true,
    }
);

const Banner = mongoose.model('Banner', BannerSchema);

export default Banner;
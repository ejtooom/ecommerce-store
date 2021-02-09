import mongoose from 'mongoose';

const AdvertisingBoxSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    link: {type: String, required: true},
    }, 
    {
    timestamps: true,
    }
);

const AdvertisingBox = mongoose.model('AdvertisingBox', AdvertisingBoxSchema);

export default AdvertisingBox;
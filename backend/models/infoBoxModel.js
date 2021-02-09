import mongoose from 'mongoose';

const InfoBoxSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    link: {type: String, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    }, 
    {
    timestamps: true,
    }
);

const InfoBox = mongoose.model('InfoBox', InfoBoxSchema);

export default InfoBox;
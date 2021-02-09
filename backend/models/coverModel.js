import mongoose from 'mongoose';

const CoverSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    link: {type: String, required: true},
    }, 
    {
    timestamps: true,
    }
);

const Cover = mongoose.model('Cover', CoverSchema);

export default Cover;
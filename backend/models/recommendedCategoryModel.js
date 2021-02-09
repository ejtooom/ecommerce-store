import mongoose from 'mongoose';

const RecommendedCategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    link: {type: String, required: true},
    }, 
    {
    timestamps: true,
    }
);

const RecommendedCategory = mongoose.model('RecommendedCategory', RecommendedCategorySchema);

export default RecommendedCategory;
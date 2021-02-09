import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    image2: {type: String, required: false},
    image3: {type: String, required: false},
    image4: {type: String, required: false},
    image5: {type: String, required: false},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    subcategory: {type: String, required: true},
    tag: {type: String, required: false},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    countInStock: {type: Number, required: true},
    deliveryTime: {type: String, required: true},
    rating: {type: Number, required: false},
    numReviews: {type: Number, required: false},
    }, 
    {
    timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
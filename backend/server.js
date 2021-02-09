import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import advertisingBoxRouter from './routers/advertisingBoxRouter.js';
import recommendedCategoryRouter from './routers/recommendedCategoryRouter.js';
import coverRouter from './routers/coverRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import infoBoxRouter from './routers/infoBoxRouter.js';
import bannerRouter from './routers/bannerRouter.js';
import newsletterRouter from './routers/newsletterRouter.js';
import contactFormRouter from './routers/contactFormRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/ecommercestore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/advertisingboxes', advertisingBoxRouter);
app.use('/api/infoboxes', infoBoxRouter);
app.use('/api/recommendedcategories', recommendedCategoryRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/covers', coverRouter);
app.use('/api/newsletters', newsletterRouter);
app.use('/api/contactforms', contactFormRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
  });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/frontend/build/index.html')));
// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });

app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running: http://localhost:${port}`);
});
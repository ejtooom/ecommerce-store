import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Banner from '../models/bannerModel.js';
import { isAdmin, isAuth } from '../utils.js';


const bannerRouter = express.Router();

bannerRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const banners = await Banner.find({});
      res.send(banners);
    })
  );

bannerRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdBanners = await Banner.insertMany(data.banners);
    res.send({ createdBanners });
  })
);

bannerRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (banner) {
      res.send(banner);
    } else {
      res.status(404).send({ message: 'Banner Not Found' });
    }
  })
);

bannerRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const banner = new Banner({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      link: 'sample link',
    });
    const createdBanner = await banner.save();
    res.send({ message: 'Banner Created', banner: createdBanner });
  })
);

bannerRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const bannerId = req.params.id;
    const banner = await Banner.findById(bannerId);
    if (banner) {
      banner.name = req.body.name;
      banner.category = req.body.category;
      banner.subcategory = req.body.subcategory;
      banner.link = req.body.link;
      banner.image = req.body.image;
      const updatedBanner = await banner.save();
      res.send({ message: 'Banner Updated', banner: updatedBanner });
    } else {
      res.status(404).send({ message: 'Banner Not Found' });
    }
  })
);

bannerRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const banner = await Banner.findById(req.params.id);
    if (banner) {
      const deleteBanner = await banner.remove();
      res.send({ message: 'Banner Deleted', banner: deleteBanner });
    } else {
      res.status(404).send({ message: 'Banner Not Found' });
    }
  })
);


export default bannerRouter;
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import AdvertisingBox from '../models/advertisingBoxModel.js';
import { isAdmin, isAuth } from '../utils.js';

const advertisingBoxRouter = express.Router();

advertisingBoxRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const advertisingBoxes = await AdvertisingBox.find({});
      res.send(advertisingBoxes);
    })
  );

advertisingBoxRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdAdvertisingBoxes = await AdvertisingBox.insertMany(data.advertisingBoxes);
    res.send({ createdAdvertisingBoxes });
  })
);

advertisingBoxRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const advertisingBox = await AdvertisingBox.findById(req.params.id);
    if (advertisingBox) {
      res.send(advertisingBox);
    } else {
      res.status(404).send({ message: 'Box Not Found' });
    }
  })
);

advertisingBoxRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const advertisingBox = new AdvertisingBox({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      link: 'sample link',
    });
    const createdAdvertisingBox = await advertisingBox.save();
    res.send({ message: 'Box Created', advertisingBox: createdAdvertisingBox });
  })
);

advertisingBoxRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const advertisingBoxId = req.params.id;
    const advertisingBox = await AdvertisingBox.findById(advertisingBoxId);
    if (advertisingBox) {
      advertisingBox.name = req.body.name;
      advertisingBox.link = req.body.link;
      advertisingBox.image = req.body.image;
      const updatedAdvertisingBox = await advertisingBox.save();
      res.send({ message: 'AdvertisingBox Updated', advertisingBox: updatedAdvertisingBox });
    } else {
      res.status(404).send({ message: 'Box Not Found' });
    }
  })
);

advertisingBoxRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const advertisingBox = await AdvertisingBox.findById(req.params.id);
    if (advertisingBox) {
      const deleteAdvertisingBox = await advertisingBox.remove();
      res.send({ message: 'Box Deleted', advertisingBox: deleteAdvertisingBox });
    } else {
      res.status(404).send({ message: 'Box Not Found' });
    }
  })
);


export default advertisingBoxRouter;
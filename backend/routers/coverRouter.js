import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Cover from '../models/coverModel.js';
import { isAdmin, isAuth } from '../utils.js';


const coverRouter = express.Router();

coverRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const covers = await Cover.find({});
      res.send(covers);
    })
  );

coverRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdCovers = await Cover.insertMany(data.covers);
    res.send({ createdCovers });
  })
);

coverRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const cover = await Cover.findById(req.params.id);
    if (cover) {
      res.send(cover);
    } else {
      res.status(404).send({ message: 'Cover Not Found' });
    }
  })
);

coverRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const cover = new Cover({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      link: 'sample link',
    });
    const createdCover = await cover.save();
    res.send({ message: 'Cover Created', cover: createdCover });
  })
);

coverRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const coverId = req.params.id;
    const cover = await Cover.findById(coverId);
    if (cover) {
      cover.name = req.body.name;
      cover.link = req.body.link;
      cover.image = req.body.image;
      const updatedCover = await cover.save();
      res.send({ message: 'Cover Updated', cover: updatedCover });
    } else {
      res.status(404).send({ message: 'Cover Not Found' });
    }
  })
);

coverRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const cover = await Cover.findById(req.params.id);
    if (cover) {
      const deleteCover = await cover.remove();
      res.send({ message: 'Cover Deleted', cover: deleteCover });
    } else {
      res.status(404).send({ message: 'Cover Not Found' });
    }
  })
);


export default coverRouter;
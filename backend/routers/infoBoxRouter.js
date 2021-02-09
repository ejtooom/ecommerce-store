import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import InfoBox from '../models/infoBoxModel.js';
import { isAdmin, isAuth } from '../utils.js';


const infoBoxRouter = express.Router();

infoBoxRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const infoBoxes = await InfoBox.find({});
      res.send(infoBoxes);
    })
  );

infoBoxRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdInfoBoxes = await InfoBox.insertMany(data.infoBoxes);
    res.send({ createdInfoBoxes });
  })
);

infoBoxRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const infoBox = await InfoBox.findById(req.params.id);
    if (infoBox) {
      res.send(infoBox);
    } else {
      res.status(404).send({ message: 'InfoBox Not Found' });
    }
  })
);

infoBoxRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const infoBox = new InfoBox({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      link: 'sample link',
      title: 'sample title',
      text: 'sample text',
    });
    const createdInfoBox = await infoBox.save();
    res.send({ message: 'InfoBox Created', infoBox: createdInfoBox });
  })
);

infoBoxRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const infoBoxId = req.params.id;
    const infoBox = await InfoBox.findById(infoBoxId);
    if (infoBox) {
      infoBox.name = req.body.name;
      infoBox.link = req.body.link;
      infoBox.image = req.body.image;
      infoBox.title = req.body.title;
      infoBox.text = req.body.text;
      const updatedInfoBox = await infoBox.save();
      res.send({ message: 'InfoBox Updated', infoBox: updatedInfoBox });
    } else {
      res.status(404).send({ message: 'InfoBox Not Found' });
    }
  })
);

infoBoxRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const infoBox = await InfoBox.findById(req.params.id);
    if (infoBox) {
      const deleteInfoBox = await infoBox.remove();
      res.send({ message: 'InfoBox Deleted', infoBox: deleteInfoBox });
    } else {
      res.status(404).send({ message: 'InfoBox Not Found' });
    }
  })
);


export default infoBoxRouter;
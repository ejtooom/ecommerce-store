import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Newsletter from '../models/newsletterModel.js';
import { isAdmin, isAuth } from '../utils.js';


const newsletterRouter = express.Router();

newsletterRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const newsletters = await Newsletter.find({});
      res.send(newsletters);
    })
  );

newsletterRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdNewsletters = await Newsletter.insertMany(data.newsletters);
    res.send({ createdNewsletters });
  })
);

newsletterRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newsletter = await Newsletter.findById(req.params.id);
    if (newsletter) {
      res.send(newsletter);
    } else {
      res.status(404).send({ message: 'Newsletter Not Found' });
    }
  })
);

newsletterRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const newsletter = new Newsletter({
      email: req.body.email,
    });
    const createdNewsletter = await newsletter.save();
    res.send({
      _id: createdNewsletter._id,
      email: createdNewsletter.email,
    })
    res.send({ message: 'Newsletter Added', newsletter: createdNewsletter });
  })
);

newsletterRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newsletter = await Newsletter.findById(req.params.id);
    if (newsletter) {
      const deleteNewsletter = await newsletter.remove();
      res.send({ message: 'Newsletter Deleted', newsletter: deleteNewsletter });
    } else {
      res.status(404).send({ message: 'Newsletter Not Found' });
    }
  })
);


export default newsletterRouter;
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import RecommendedCategory from '../models/recommendedCategoryModel.js';
import { isAdmin, isAuth } from '../utils.js';

const recommendedCategoryRouter = express.Router();

recommendedCategoryRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const recommendedCategories = await RecommendedCategory.find({});
      res.send(recommendedCategories);
    })
  );

recommendedCategoryRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdRecommendedCategories = await RecommendedCategory.insertMany(data.recommendedCategories);
    res.send({ createdRecommendedCategories });
  })
);

recommendedCategoryRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const recommendedCategory = await RecommendedCategory.findById(req.params.id);
    if (recommendedCategory) {
      res.send(recommendedCategory);
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);

recommendedCategoryRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const recommendedCategory = new RecommendedCategory({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      link: 'sample link',
    });
    const createdRecommendedCategory = await recommendedCategory.save();
    res.send({ message: 'Category Created', recommendedCategory: createdRecommendedCategory });
  })
);

recommendedCategoryRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const recommendedCategoryId = req.params.id;
    const recommendedCategory = await RecommendedCategory.findById(recommendedCategoryId);
    if (recommendedCategory) {
      recommendedCategory.name = req.body.name;
      recommendedCategory.link = req.body.link;
      recommendedCategory.image = req.body.image;
      const updatedRecommendedCategory = await recommendedCategory.save();
      res.send({ message: 'Category Updated', recommendedCategory: updatedRecommendedCategory });
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);

recommendedCategoryRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const recommendedCategory = await RecommendedCategory.findById(req.params.id);
    if (recommendedCategory) {
      const deleteRecommendedCategory = await recommendedCategory.remove();
      res.send({ message: 'Category Deleted', recommendedCategory: deleteRecommendedCategory });
    } else {
      res.status(404).send({ message: 'Category Not Found' });
    }
  })
);


export default recommendedCategoryRouter;
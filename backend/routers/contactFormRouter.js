import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import ContactForm from '../models/contactFormModel.js';
import { isAdmin, isAuth } from '../utils.js';


const contactFormRouter = express.Router();

contactFormRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await ContactForm.count({});
    const contactForms = await ContactForm.find({})
    .skip(pageSize * (page -1))
    .limit(pageSize)
    ;
    res.send({contactForms, page, pages: Math.ceil(count / pageSize)});
  })
);

contactFormRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await ContactForm.count({ user: req.user._id });
    const contactForms = await ContactForm.find({ user: req.user._id })
      .skip(pageSize * (page -1))
      .limit(pageSize)
    ;
    res.send({contactForms, page, pages: Math.ceil(count / pageSize)});
  })
);

contactFormRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdContactForms = await ContactForm.insertMany(data.contactForms);
    res.send({ createdContactForms });
  })
);

contactFormRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contactForm = await ContactForm.findById(req.params.id);
    if (contactForm) {
      res.send(contactForm);
    } else {
      res.status(404).send({ message: 'Contact Form Not Found' });
    }
  })
);

contactFormRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const contactForm = new ContactForm({
      name: req.body.name,
      email: req.body.email,
      title: req.body.title,
      text: req.body.text,
    });
    const createdContactForm = await contactForm.save();
    res.send({
      _id: createdContactForm._id,
      name: createdContactForm.name,
      email: createdContactForm.email,
      title: createdContactForm.title,
      text: createdContactForm.text,
    })
    res.send({ message: 'Contact Form Added', contactForm: createdContactForm });
  })
);

contactFormRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contactForm = await ContactForm.findById(req.params.id);
    if (contactForm) {
      const deleteContactForm = await contactForm.remove();
      res.send({ message: 'Contact Form Deleted', contactForm: deleteContactForm });
    } else {
      res.status(404).send({ message: 'Contact Form Not Found' });
    }
  })
);


export default contactFormRouter;
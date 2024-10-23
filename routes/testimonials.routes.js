// testimonials.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db/db');
const shortid = require('shortid');
const Testimonial = require('../models/testimonial.model');

router.get('/testimonials', async (req, res) => {
    //res.json(db.testimonials);
    try {
        res.json(await Testimonial.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    };
});

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

router.get('/testimonials/random', async (req, res) => {
    try {
        const count = await Testimonial.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const tes = await Testimonial.findOne().skip(rand);
        if (!tes) res.status(404).json({ message: 'Not found', rand: rand, count })
        else res.json(tes);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});



router.get('/testimonials/:id', async (req, res) => {
    // const id = parseInt(req.params.id); // Convert id to a number
    // console.log('id', id);
    // const result = db.testimonials.find(item => item.id === id);
    // res.json(result);

    try {
        const tes = await Testimonial.findById(req.params.id);
        if (!tes) res.status(404).json({ message: 'Not found' });
        else res.json(tes);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.post('/testimonials', async (req, res) => {
    // const { author, text } = req.body; 
    // const newTestimonial = { id: shortid.generate(), author, text };
    // db.testimonials.push(newTestimonial);
    // console.log(newTestimonial);
    // res.json(newTestimonial);
    try {
        const { author, text } = req.body;
        const newTestimonial = new Testimonial({ author, text });
        await newTestimonial.save();
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.put('/testimonials/:id', async (req, res) => {
    // const id = parseInt(req.params.id);
    // console.log('id', id);
    // const { author, text } = req.body; 

    // const testimonial = db.testimonials.find(item => item.id === id);

    // if(testimonial) {
    //     if (author) testimonial.author = author; 
    //     if (text) testimonial.text = text;

    //     res.json({ message: 'Testimonial updated', updatedTestimonial: testimonial });

    //     console.log('db.testimonials', db.testimonials);
    // } else {
    //     res.status(404).json({ message: 'Testimonial not found' });
    // }
    //const { author, text } = req.body;
    try {
        await Testimonial.updateOne({ _id: req.params.id }, { $set: { ...req.body } });
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.delete('/testimonials/:id', async (req, res) => {
    // const id = parseInt(req.params.id);

    // const deletedTestimonial = db.testimonials.filter(item => item.id !== id);

    // console.log(deletedTestimonial);

    // res.json({ message: 'deleted testimonial: ', deletedTestimonial });
    try {
        const tes = await Testimonial.findById(req.params.id);
        if (tes) {
            await Testimonial.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router; 
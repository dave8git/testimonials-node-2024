// testimonials.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const shortid = require('shortid');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

router.route('/testimonials/random').get((req, res) => {
    const randomItem = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    console.log('dbLength', db.testimonials.length);
    console.log('randomItem', randomItem);
    res.json(randomItem);
});

router.route('/testimonials/:id').get((req, res) => {
    const id = parseInt(req.params.id); // Convert id to a number
    console.log('id', id);
    const result = db.testimonials.find(item => item.id === id);
    res.json(result);
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body; 
    const newTestimonial = { id: shortid.generate(), author, text };
    db.testimonials.push(newTestimonial);
    console.log(newTestimonial);
    res.json(newTestimonial);
});

router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    console.log('id', id);
    const { author, text } = req.body; 

    const testimonial = db.testimonials.find(item => item.id === id);

    if(testimonial) {
        if (author) testimonial.author = author; 
        if (text) testimonial.text = text;

        res.json({ message: 'Testimonial updated', updatedTestimonial: testimonial });

        console.log('db.testimonials', db.testimonials);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    const deletedTestimonial = db.testimonials.filter(item => item.id !== id);

    console.log(deletedTestimonial);

    res.json({ message: 'deleted testimonial: ', deletedTestimonial });
});

module.exports = router; 
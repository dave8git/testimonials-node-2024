// concerts.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db/db');
//const shortid = require('shortid');
const Concert = require('../models/concert.model');
router.get('/concerts', async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
    // res.json(db.testimonials);
});

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

router.get('/concerts/random', async (req, res) => {
    // const randomItem = db.concerts[Math.floor(Math.random() * db.concerts.length)];
    // console.log('dbLength', db.concerts.length);
    // console.log('randomItem', randomItem);
    // res.json(randomItem);
    try {
        const count = await Concert.countDocuments(); 
        const rand = Math.floor(Math.random() * count);
        const con = await Concert.findOne().skip(rand);
        if (!con) res.status(404).json({ message: 'Not found'});
        else res.json(con);
    } 
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.route('/concerts/:id').get((req, res) => {
    const id = parseInt(req.params.id); // Convert id to a number
    console.log('id', id);
    const result = db.concerts.find(item => item.id === id);
    res.json(result);
});

router.post('/concerts', async (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    console.log(newConcert);
    res.json({ message: 'OK' });
});

router.put('/concerts/:id', async (req, res) => {
    try {
        await Concert.updateOne({ _id: req.params.id }, { $set: { ...req.body } });
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

router.delete('/concerts/:id', async (req, res) => {
    // const id = parseInt(req.params.id);
    // const deletedSeat = db.concerts.filter(item => item.id !== id);
    // console.log(deletedSeat);
    // res.json({ message: 'deleted seat: ', deletedSeat });
    try {
        const con = await Concert.findById(req.params.id);
        if (con) {
            await Concert.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router; 
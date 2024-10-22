// concerts.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db/db');
const shortid = require('shortid');
const Concert = require('../models/concert.model');
router.get('/concerts', async (req, res) => {
    try {
        res.json(await Concert.find());
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
    // res.json(db.testimonials);
});

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

router.route('/concerts/random').get((req, res) => {
    const randomItem = db.concerts[Math.floor(Math.random() * db.concerts.length)];
    console.log('dbLength', db.concerts.length);
    console.log('randomItem', randomItem);
    res.json(randomItem);
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
    res.json({ message: 'OK'});
});

router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    console.log('id', id);
    const { performer, genre, price, day, image } = req.body; 

    const seat = db.concerts.find(item => item.id === id);

    if(seat) {
        if (performer) seat.performer = performer; 
        if (genre) seat.genre = genre;
        if (price) seat.price = price;
        if (day) seat.day = day;
        if (image) seat.image = image;

        res.json({ message: 'Seat updated', updatedSeat: seat });

        console.log('db.seat', db.concerts);
    } else {
        res.status(404).json({ message: 'concerts not found' });
    }
});

router.delete('/concerts/:id', async (req, res) => {
    // const id = parseInt(req.params.id);
    // const deletedSeat = db.concerts.filter(item => item.id !== id);
    // console.log(deletedSeat);
    // res.json({ message: 'deleted seat: ', deletedSeat });
    try {
        const con = await Concert.findById(req.params.id);
        if(con) {
          await Concert.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...'});
      }
      catch(err) {
        res.status(500).json({ message: err });
      }
});

module.exports = router; 
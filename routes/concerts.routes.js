// concerts.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const shortid = require('shortid');

router.route('/concerts').get((req, res) => {
    res.json(db.testimonials);
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

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body; 
    const newSeat = { id: shortid.generate(), performer, genre, price, day, image };
    db.concerts.push(newSeat);
    console.log(newSeat);
    res.json(newSeat);
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

router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    const deletedSeat = db.concerts.filter(item => item.id !== id);

    console.log(deletedSeat);

    res.json({ message: 'deleted seat: ', deletedSeat });
});

module.exports = router; 
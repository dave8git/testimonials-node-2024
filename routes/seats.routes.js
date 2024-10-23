// seats.routes.js

const express = require('express');
const router = express.Router();
const db = require('./../db/db');
const shortid = require('shortid');

router.get('/seats', async (req, res) => {
    res.json(db.seats);
});

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

router.route('/seats/random').get((req, res) => {
    const randomItem = db.seats[Math.floor(Math.random() * db.seats.length)];
    console.log('dbLength', db.seats.length);
    console.log('randomItem', randomItem);
    res.json(randomItem);
});

router.route('/seats/:id').get((req, res) => {
    const id = parseInt(req.params.id); // Convert id to a number
    console.log('id', id);
    const result = db.seats.find(item => item.id === id);
    res.json(result);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body; 

    const parsedDay = parseInt(day, 10);
    const parsedSeat = parseInt(seat, 10);

    const isSeatTaken = db.seats.some(existingSeat => existingSeat.day === parsedDay && existingSeat.seat === parsedSeat);

    console.log('isSeatTaken', isSeatTaken);

    if(isSeatTaken) {
        return res.status(400).json({ message: 'The seat is already taken.' });
    }

    const newSeat = { id: shortid.generate(),  day: parsedDay, seat: parsedSeat, client, email };
    db.seats.push(newSeat);
    req.io.emit('seatsUpdated', db.seats);
    console.log('db', db);
    console.log(newSeat);
    res.json(newSeat);
});

router.route('/seats/:id').put((req, res) => {
    const id = parseInt(req.params.id);
    console.log('id', id);
    const {  day, seat, client, email } = req.body; 

    const seatItem = db.seats.find(item => item.id === id);

    if(seatItem) {
        if (day) seatItem.day = day; 
        if (seat) seatItem.seat = seat;
        if (client) seatItem.client = client;
        if (email) seatItem.email = email;

        res.json({ message: 'Seat updated', updatedSeat: seat });

        console.log('db.seat', db.seats);
    } else {
        res.status(404).json({ message: 'Seats not found' });
    }
});

router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);

    const deletedSeat = db.seats.filter(item => item.id !== id);

    console.log(deletedSeat);

    res.json({ message: 'deleted seat: ', deletedSeat });
});

module.exports = router; 
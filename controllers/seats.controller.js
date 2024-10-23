const Seat = require('../models/seat.model');

exports.getAll('/seats', async (req, res) => {
    //res.json(db.seats);
    try {
        res.json(await Seat.find());
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

exports.getRandom('/seats/random', async (req, res) => {
    // const randomItem = db.seats[Math.floor(Math.random() * db.seats.length)];
    // console.log('dbLength', db.seats.length);
    // console.log('randomItem', randomItem);
    // res.json(randomItem);
    try {
        const count = await Seat.countDocuments(); 
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne().skip(rand);
        if (!seat) res.status(404).json({ message: 'Not found'});
        else res.json(seat);
    } 
    catch (err) {
        res.status(500).json({ message: err });
    }
});

exports.getById('/seats/:id', async (req, res) => {
    // const id = parseInt(req.params.id); // Convert id to a number
    // console.log('id', id);
    // const result = db.seats.find(item => item.id === id);
    // res.json(result);
    try {
        const seat = await Seats.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
      } 
      catch(err) {
        res.status(500).json({ message: err });
      }
});

exports.post('/seats', async (req, res) => {
    const { day, seat, client, email } = req.body; 

    const parsedDay = parseInt(day, 10);
    const parsedSeat = parseInt(seat, 10);

    //const isSeatTaken = db.seats.some(existingSeat => existingSeat.day === parsedDay && existingSeat.seat === parsedSeat);
    const isSeatTaken = await Seat.findOne({ day: parsedDay, seat: parsedSeat });
    console.log('isSeatTaken', isSeatTaken);

    if(isSeatTaken) {
        return res.status(400).json({ message: 'The seat is already taken.' });
    }

    // const newSeat = { id: shortid.generate(),  day: parsedDay, seat: parsedSeat, client, email };
    // db.seats.push(newSeat);
    // req.io.emit('seatsUpdated', db.seats);
    // console.log('db', db);
    // console.log(newSeat);
    // res.json(newSeat);
    const newSeat = new Seat({ day: parsedDay, seat: parsedSeat, client, email });
    await newSeat.save();
    console.log(newSeat);
    res.json({ message: 'OK' });
});

exports.put('/seats/:id', async (req, res) => {
    // const id = parseInt(req.params.id);
    // console.log('id', id);
    // const {  day, seat, client, email } = req.body; 

    // const seatItem = db.seats.find(item => item.id === id);

    // if(seatItem) {
    //     if (day) seatItem.day = day; 
    //     if (seat) seatItem.seat = seat;
    //     if (client) seatItem.client = client;
    //     if (email) seatItem.email = email;

    //     res.json({ message: 'Seat updated', updatedSeat: seat });

    //     console.log('db.seat', db.seats);
    // } else {
    //     res.status(404).json({ message: 'Seats not found' });
    // }
    try {
        await Seat.updateOne({ _id: req.params.id }, { $set: { ...req.body } });
        res.json({ message: 'OK' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

exports.delete('/seats/:id', async (req, res) => {
    // const id = parseInt(req.params.id);

    // const deletedSeat = db.seats.filter(item => item.id !== id);

    // console.log(deletedSeat);

    // res.json({ message: 'deleted seat: ', deletedSeat });
    try {
        const seat = await Seat.findById(req.params.id);
        if (seat) {
            await Seat.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
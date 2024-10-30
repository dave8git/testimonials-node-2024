const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
//const db = require('./db/db');
const socket = require('socket.io');
const mongoose = require('mongoose');

// const testimonials = db.testimonials;
// const concerts = db.concerts;
// const seats = db.seats; 
const sanitize = require('mongo-sanitize');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


//app.use(express.static(path.join(__dirname, '/public')));

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log(`new socket ${socket.id}`);
})

app.use((req, res, next) => {
    req.io = io; 
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).send('404 not found...'); // nie potrzeba funkcji next() kiedy adres jest niewłaściwy aplikacja nie idzie dalej
});

// mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://administrator:dave82@cluster-dev.2kqw2.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster-dev', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connect to the database');
});

db.on('error', err => console.log('Error ' + err));
console.log('Successfully connected to the database');
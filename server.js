const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const db = require('./db/db')

const testimonials = db.testimonials;
const concerts = db.concerts;
const seats = db.seats; 

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');


//app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes);
app.use('/api/', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).send('404 not found...'); // nie potrzeba funkcji next() kiedy adres jest niewłaściwy aplikacja nie idzie dalej
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
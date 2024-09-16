const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const shortid = require('shortid');

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Marcin Doe', text: 'Their food is ok.' },
    { id: 4, author: 'Linda Evans', text: 'Ok place, good prices.' },
    { id: 5, author: 'Lindy Johns', text: 'Nice place in nice part of town.' },
    { id: 6, author: 'Indy Johnson', text: 'Nice place to eat when you feel very hungry.' },
    { id: 7, author: 'Danny California', text: 'Good service.' },
    { id: 8, author: 'Mike Hansen', text: 'They do nice stuff.' },
    { id: 9, author: 'Dowg Bounty', text: 'Best people in town.' },
];

//app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

app.get('/testimonials', (req, res) => {
    console.log('testimonials ruszyło');
    res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
});

app.get('/testimonials/random', (req, res) => {
    const randomItem = db[Math.floor(Math.random() * db.length)];
    console.log('dbLength', db.length);
    console.log('randomItem', randomItem);
    res.json(randomItem);
});

app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convert id to a number
    console.log('id', id);
    const result = db.find(item => item.id === id);
    res.json(result);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body; 
    const newTestimonial = { id: shortid.generate(), author, text };
    db.push(newTestimonial);
    console.log(newTestimonial);
    res.json(newTestimonial);
});

app.put('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log('id', id);
    const { author, text } = req.body; 

    const testimonial = db.find(item => item.id === id);

    if(testimonial) {
        if (author) testimonial.author = author; 
        if (text) testimonial.text = text;

        res.json({ message: 'Testimonial updated', updatedTestimonial: testimonial });

        console.log('db', db);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

app.delete('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const deletedTestimonial = db.filter(item => item.id !== id);

    console.log(deletedTestimonial);

    res.json({ message: 'deleted testimonial: ', deletedTestimonial });
})

app.use((req, res) => {
    res.status(404).send('404 not found...'); // nie potrzeba funkcji next() kiedy adres jest niewłaściwy aplikacja nie idzie dalej
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
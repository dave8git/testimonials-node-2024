// concerts.routes.js

const express = require('express');
const router = express.Router();
//const db = require('./../db/db');
//const shortid = require('shortid');
const ConcertsControllers = require('../controllers/concerts.controller');
router.get('/concerts', ConcertsControllers.getAll);

// app.get('/testimonials', (req, res) => {
//     console.log('testimonials ruszyło');
//     res.json(db); // zanim odpowie co jest pod '/' użyje metody show 
// });

router.get('/concerts/random', ConcertsControllers.getRandom);

router.get('/concerts/:id', ConcertsControllers.getById);

router.post('/concerts', ConcertsControllers.post);

router.put('/concerts/:id', ConcertsControllers.put);

router.delete('/concerts/:id', ConcertsControllers.delete);

module.exports = router;
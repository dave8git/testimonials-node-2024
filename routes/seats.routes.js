// seats.routes.js

const express = require('express');
const router = express.Router();
// //const db = require('./../db/db');
// const shortid = require('shortid');
// const Seat = require('../models/seat.model');

const SeatsControllers = require('../controllers/testimonials.controller');

router.get('/seats', SeatsControllers.getAll);
router.get('/seats/random', SeatsControllers.getRandom);
router.get('/seats/:id', SeatsControllers.getById);
router.post('/seats', SeatsControllers.post);
router.put('/seats/:id', SeatsControllers.put);
router.delete('/seats/:id', SeatsControllers.delete);

module.exports = router; 
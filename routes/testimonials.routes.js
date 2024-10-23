const express = require('express');
const router = express.Router();

const TestimonialsControllers = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialsControllers.getAll);
router.get('/testimonials/random', TestimonialsControllers.getRandom);
router.get('/testimonials/:id', TestimonialsControllers.getById);
router.post('/testimonials', TestimonialsControllers.post);
router.put('/testimonials/:id', TestimonialsControllers.put);
router.delete('/testimonials/:id', TestimonialsControllers.delete);

module.exports = router;
const express = require('express');
const router = express();
const testimonialController = require('../model/testimonialController');
const upload = require('../service/multer');

router.delete('/multiDeleteTestimonial/:id', testimonialController.multiDeleteTestimonial);

router.post('/addTestimonial', upload.single('testimonialImage'), testimonialController.addTestimonial);

router.get('/viewTestimonial/:id', testimonialController.viewTestimonial);

router.put('/updateTestimonial/:id', upload.single('testimonialImage'), testimonialController.updateTestimonial);

router.delete('/deleteTestimonial/:id', testimonialController.deleteTestimonial);

module.exports = router;
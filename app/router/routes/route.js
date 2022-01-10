const { Route } = require('express');
let express = require('express');
let router = express.Router();

const route = require('../userRoute');
const contactRoute = require('../contactRoute');
const categoryRoute = require('../categoryRoute');
const testimonialRoute = require('../testimonialRoute');
const portfolioRoute = require('../portfolioRoute');

router.use('/', route);
router.use('/', contactRoute);
router.use('/', categoryRoute);
router.use('/', testimonialRoute);
router.use('/', portfolioRoute);

module.exports = router;

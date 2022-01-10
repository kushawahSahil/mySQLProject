const express = require('express');
const router = express();
const portfolioController = require('../model/portfolioController');
const upload = require('../service/multer');

router.post('/addPortfolio', upload.array('projectImage', 5), portfolioController.addPortfolio);

router.delete('/multiDeletePortfolio/:id', portfolioController.multiDeletePortfolio);
router.get('/viewPortfolio/:id', portfolioController.viewPortfolio);


router.put('/updatePortfolio/:id', portfolioController.updatePortfolio);

router.delete('/deletePortfolio/:id', portfolioController.deletePortfolio);


module.exports = router;
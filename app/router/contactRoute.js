const express = require('express');
const router = express();
const contactController = require('../model/contactController');
const { authenticate, generateToken } = require('../model/authmodel');

router.post('/addContact', authenticate, contactController.addContact);

router.delete('/multiDeleteContact/:id', contactController.multiDeleteContact);
router.get('/viewContact/:id', contactController.viewContact);


router.put('/updateContact/:id', contactController.updateContact);

router.delete('/deleteContact/:id', contactController.deleteContact);

module.exports = router;
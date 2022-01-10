const express = require('express');
const router = express();
const categoryController = require('../model/categoryController');

router.post('/addCategory', categoryController.addCategory);

router.delete('/multiDeleteCategory/:id', categoryController.multiDeleteCategory);

router.get('/viewCategory/:id', categoryController.viewCategory);

router.put('/updateCategory/:id', categoryController.updateCategory);

router.delete('/deleteCategory/:id', categoryController.deleteCategory);




module.exports = router;
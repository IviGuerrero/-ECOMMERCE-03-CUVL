const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

router.post('/', carritoController.createOrder);

module.exports = router;
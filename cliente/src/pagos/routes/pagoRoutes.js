const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

router.post('/', pagoController.realizarPago);

module.exports = router;

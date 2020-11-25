const express = require('express');

const cardRouter = express.Router();
const getCards = require('../controllers/cardControllers');

cardRouter.get('/cards', getCards);

module.exports = cardRouter;

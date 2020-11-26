const express = require('express');
const { getCards } = require('../controllers/cardControllers');

const cardRouter = express.Router();

cardRouter.get('/cards', getCards);

module.exports = cardRouter;

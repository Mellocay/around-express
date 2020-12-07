const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
  .then(cards => res.status(200).send(cards))
  .catch(err => res.status(400).send({ message: 'Error' }));
}

module.exports = {
  getCards,
};

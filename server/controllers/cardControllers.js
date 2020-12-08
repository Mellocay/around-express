const Card = require('../models/card');

function getCards(req, res) {
  return Card.find({})
  .then(cards => res.status(200).send(cards))
  .catch(err => res.status(400).send({ message: 'err' }));
}

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch(err => res.status(500).send({ message: err }));
};

function deleteCard(req, res) {
    Card.findByIdAndRemove(req.params.id)
      .then(card => res.send({ data: card, message: "card deleted" }))
      .catch(err => res.status(500).send({ message: err }));
};


module.exports = {
  getCards,
  createCard,
  deleteCard,
};

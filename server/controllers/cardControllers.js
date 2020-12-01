const path = require('path');
const getFileContent = require('../helpers/getFileContent');

const cardDataPath = path.join(__dirname, '..', 'data', 'cardData.json');

function getCards(req, res) {
  return getFileContent(cardDataPath)
    .then((cards) => {
      res.status(200).send(cards)})
    .catch((err) => res.status(500).send(err));
}

module.exports = {
  getCards,
};

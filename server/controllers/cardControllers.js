const path = require('path');
const cardDataPath = path.join(__dirname, '..', 'data', 'cardData.json');
const getFileContent = require('../helpers/getFileContent');

function getCards(req, res) {
  return getFileContent(cardDataPath)
    .then((cards) => {
      res.status(200).send(cards);
    })
}

module.exports = {
  getCards
}
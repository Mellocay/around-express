const path = require('path');

const userDataPath = path.join(__dirname, '..', 'data', 'userData.json');
const getFileContent = require('../helpers/getFileContent');

function getUsers(req, res) {
  return getFileContent(userDataPath)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => res.status(500).send(err));
}

const getOneUser = (req, res) => getFileContent(userDataPath)
  .then((users) => users.friends.find((user) => user._id === req.params.id))
  .then((user) => {
    if (user) {
      return res.status(200).send(user);
    }
    res.status(404).send({ message: 'User ID not found' });
  })
  .catch((err) => res.status(500).send(err));

module.exports = {
  getUsers,
  getOneUser,
};

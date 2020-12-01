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

function getOneUser(req, res) {
  return getFileContent(userDataPath)
    .then((users) => {
      const user = users.find((user) => user._id === req.params.id);

      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ message: 'user not found' });
    })
    .catch((err) => res.status(500).send(err));
}

module.exports = {
  getUsers,
  getOneUser,
};

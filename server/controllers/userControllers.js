const path = require('path');
const userDataPath = path.join(__dirname, '..', 'data', 'userData.json');
const getFileContent = require('../helpers/getFileContent');

function getUsers(req, res) {
  return getFileContent(userDataPath)
      .then((users) => {
        res.status(200).send(users);
      })
}

function getOneUser(req, res) {
  return getFileContent(userDataPath)
  .then((users) => {
    const user = users.friends.find((user) => user._id === req.params.id);

    if(user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({message: 'user not found'});
  })
  .catch(err => res.status(400).send(err));
}

module.exports = {
  getUsers,
  getOneUser
}
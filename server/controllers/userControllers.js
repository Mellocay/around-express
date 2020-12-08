const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
  .then(users => res.status(200).send(users))
  .catch(err => res.status(400).send({ message: 'Error' }));
}

function getOneUser(req, res) {
  return User.find({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'No such profile exists' })
      }
      return res.status(200).send(user);
    })
    .catch(err => res.status(400).send({ message: 'Error' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  // record data into the database
  User.create({ name, about, avatar })
    // return the recorded data to the user
    .then((user) => res.status(200).send(user))
    // if the data was not recorded, display an error message
    .catch(err => res.status(500).send({ message: err }));
};


module.exports = {
  getUsers,
  getOneUser,
  createUser,
};

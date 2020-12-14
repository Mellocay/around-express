const User = require('../models/user');

function getUsers(req, res) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send({ message: err }));
}

function getOneUser(req, res) {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'No such profile exists' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  // record data into the database
  User.create({ name, about, avatar })
    // return the recorded data to the user
    .then((user) => res.status(200).send(user))
    // if the data was not recorded, display an error message
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err });
      }
      res.status(500).send({ message: err });
    });
}

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id, {
      name: req.params.name,
      about: req.params.about,
      avatar: req.params.aatar,
    },
  )
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Imaginary profile detected.  We found no such profile in our system' });
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
};

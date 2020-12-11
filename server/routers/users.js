const express = require('express');
const {
  getUsers, getOneUser, createUser, updateUser,
} = require('../controllers/userControllers.js');

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getOneUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;

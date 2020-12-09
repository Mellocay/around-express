const express = require('express');
const {
  getUsers, getOneUser, createUser, updateUser,
} = require('../controllers/userControllers.js');

const userRouter = express.Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getOneUser);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);

module.exports = userRouter;

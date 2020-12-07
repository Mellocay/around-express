const express = require('express');
const { getUsers, getOneUser, createUser } = require('../controllers/userControllers.js');

const userRouter = express.Router();

userRouter.get('/users', getUsers);

userRouter.get('/users/:id', getOneUser);

userRouter.post('/users', createUser);

module.exports = userRouter;

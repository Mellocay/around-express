const express = require('express');
const { getUsers, getOneUser } = require('../controllers/userControllers.js');

const userRouter = express.Router();

userRouter.get('/users', getUsers);

userRouter.get('/users/:id', getOneUser);

module.exports = userRouter;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// show static page
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '5fcf93367ede1b33d48beb14', // paste the _id of the test user created in the previous step
  };
  next();
});

// connect to routers
app.use('/', userRouter);
app.use('/', cardRouter);

// requested page doesn't exist
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

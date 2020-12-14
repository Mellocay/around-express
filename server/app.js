const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(helmet());

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5fcf93367ede1b33d48beb14', // paste the _id of the test user created in the previous step
  };
  next();
});

// connect to routers
app.use('/users', userRouter);
app.use('/cards', cardRouter);

// requested page doesn't exist
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

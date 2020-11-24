const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const path = require('path');
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRouter);
app.use('/', cardRouter);

app.get('*', (req, res) => {
  res.status(404).send({message: "Page not found"})
})

app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
})
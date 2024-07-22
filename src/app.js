const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userController = require('./user/user.controller');
const historyController = require('./history/history.controller');
const shopController = require('./shop/shop.controller');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({
    teamName: 'CH2-PS183',
    project: 'SnapCat',
    message: 'Selamat datang di API SnapCat'
  });
});

app.use('/api', userController);
app.use('/api', historyController);
app.use('/api', shopController);

module.exports = app;
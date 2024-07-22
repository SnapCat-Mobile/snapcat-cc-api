const express = require('express');
const prisma = require('../db/database');
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorization.middleware');
const { generateAccessToken, generateRefreshToken, authenticateToken } = require('../middleware/authorization.middleware');
const { createHistory, getAllHistories, getHistoryById } = require('./history.service');

router.post('/history', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    const historyData = req.body;
    const userId = req.user.id;

    historyData.userId = userId;
    const history = await createHistory(historyData);
  
    res.status(201).send({
      data: history,
      message: 'History created successfully.',     
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/histories/:id', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const histories = await getAllHistories(userId);

    res.status(200).send({
      data: histories,
      message: 'Histories retrieved successfully.',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/history/:id', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    const historyId = req.params.id;
    const history = await getHistoryById(historyId);
   
    res.status(200).send({
      data: history,
      message: 'History retrieved successfully.',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
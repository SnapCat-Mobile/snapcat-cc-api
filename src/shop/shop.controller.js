const express = require('express');
const prisma = require('../db/database');
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorization.middleware');
const { generateAccessToken, generateRefreshToken, authenticateToken } = require('../middleware/authorization.middleware');
const { createShop, getAllShops } = require('./shop.service');

router.post('/shop', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    const shopData = req.body;
    const shop = await createShop(shopData);
  
    res.status(201).send({
      data: shop,
      message: 'Shop created successfully.',     
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/shops/:id', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const shops = await getAllShops(userId);

    res.status(200).send({
      data: shops,
      message: 'Shops retrieved successfully.',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
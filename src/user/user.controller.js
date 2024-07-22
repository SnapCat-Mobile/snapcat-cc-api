const express = require('express');
const prisma = require('../db/database');
const router = express.Router();
const authorizationMiddleware = require('../middleware/authorization.middleware');
const { generateAccessToken, generateRefreshToken, authenticateToken } = require('../middleware/authorization.middleware');
const { createUser, loginUser, forgotPasswordUser, getUserById } = require('./user.service');

router.post('/users/register', async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
  
    res.status(201).send({
      data: user,
      message: 'User created successfully.',     
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    res.status(200).send({
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
      message: 'Login successful.',
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post('/users/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await forgotPasswordUser(email);

    res.status(200).send({
      data: user,
      message: 'New password sent to your email.',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/users/:id', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);

    res.status(200).send({
      data: user,
      message: 'User retrieved successfully.',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/users/logout', authorizationMiddleware.authenticateToken, async (req, res) => {
  try {
    res.status(200).send({
      message: 'Logout successful.',
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
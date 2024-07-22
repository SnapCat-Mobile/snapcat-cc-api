const bcrypt = require('bcrypt');
const prisma = require('../db/database');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { findUserByUsername, findUserByEmail, updatePasswordByEmail, insertUser, findUserById } = require("./user.repository");

const createUser = async (userData) => {
  if (!userData.username || !userData.email || !userData.password) {
    throw new Error('Username, email, and password are required.');
  }

  const usernameRegex = /^[a-z0-9_]+$/;
  if (!usernameRegex.test(userData.username)) {
    throw new Error('Username should only contain lowercase letters, numbers, and underscores.');
  }

  const existingUserByUsername = await findUserByUsername(userData.username);
  if (existingUserByUsername) {
    throw new Error('Username is already taken.');
  }

  const emailRegex = /^[a-z0-9_\.]+@[a-z0-9]+\.(com|org|net)$/; 
  if (!emailRegex.test(userData.email)) {
    throw new Error('Invalid email format.');
  }

  const existingUserByEmail = await findUserByEmail(userData.email);
  if (existingUserByEmail) {
    throw new Error('Email is already registered.');
  }

  if (userData.password.length <= 8) {
    throw new Error('Password length should be more than 8 characters.');
  }

  const user = await insertUser(userData);
  
  return user;
};

const loginUser = async (email, password) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error('User not found.');
    }

    if (!user.password) {
      throw new Error('Password not set for this user.');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (passwordValid) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
      };
    } else {
      throw new Error('Invalid password.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const forgotPasswordUser = async (email) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('User not found.');
  }

  const newPassword = uuidv4().slice(0, 12); 
  const updatedUser = await updatePasswordByEmail(email, newPassword);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    text: `Your new password is: ${newPassword}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error('Failed to send email.');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  return updatedUser;
};

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw new Error('User not found.');
  } 

  return user;
};

module.exports = {
  createUser,
  loginUser,
  forgotPasswordUser,
  getUserById
};
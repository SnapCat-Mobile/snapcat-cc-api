const prisma = require('../db/database');
const { insertHistory, findHistories, findHistoryById } = require('./history.repository');

const createHistory = async (historyData) => {
  if (!historyData.image || !historyData.breed || !historyData.description || !historyData.userId) {
    throw new Error('UserId, image, breed, and description are required.');
  }

  const history = await insertHistory(historyData);
  
  return history;
};

const getAllHistories = async (userId) => {
  const histories = await findHistories(userId);

  return histories;
};

const getHistoryById = async (id) => {
  const history = await findHistoryById(id);

  if (!history) {
    throw new Error('History not found.');
  } 

  return history;
};

module.exports = {
  createHistory,
  getAllHistories,
  getHistoryById
};
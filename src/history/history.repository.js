const prisma = require('../db/database');

const insertHistory = async (historyData) => {
  const history = await prisma.history.create({
    data: {
      image: historyData.image,
      breed: historyData.breed,
      description: historyData.description,
      userId: historyData.userId,
    },
  });

  return history;
};

const findHistories = async (userId) => {
  const histories = await prisma.history.findMany({
    where: {
      userId,
    },
  });

  return histories;
};

const findHistoryById = async (id) => {
  const history = await prisma.history.findUnique({
    where: {
      id,
    },
  });

  return history;
};

module.exports = {
  insertHistory,
  findHistories,
  findHistoryById
};
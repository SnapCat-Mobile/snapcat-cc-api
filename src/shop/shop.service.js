const prisma = require('../db/database');
const { insertShop, findShops } = require('./shop.repository');

const createShop = async (shopData) => {
  if (!shopData.name || !shopData.address || !shopData.url_shop) {
    throw new Error('name, address, and url shop are required.');
  }

  const shop = await insertShop(shopData);
  
  return shop;
};

const getAllShops = async () => {
  const shop = await findShops();

  return shop;
};

module.exports = {
  createShop,
  getAllShops
};
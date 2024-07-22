const prisma = require('../db/database');

const insertShop = async (shopData) => {
  const shop = await prisma.shop.create({
    data: {
      name: shopData.name,
      address: shopData.address,
      url_shop: shopData.url_shop,
    },
  });

  return shop;
};

const findShops = async (userId) => {
  const shops = await prisma.shop.findMany({
    where: {
      userId,
    },
  });

  return shops;
};

module.exports = {
  insertShop,
  findShops
};
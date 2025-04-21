
const Product = require('../Models/Product');

async function generateProductId(typePrefix) {
    const count = await Product.countDocuments({ id: { $regex: `^BEAR${typePrefix}` } });
    const nextNumber = (count + 1).toString().padStart(4, '0');
    return `BEAR${typePrefix}${nextNumber}`;
  }
  
  module.exports = generateProductId;

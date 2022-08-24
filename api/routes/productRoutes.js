const productRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const seller = req.query.seller || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
    }).populate('seller', 'seller.name seller.logo');
    res.send(products);
  })
);

module.exports = productRouter;

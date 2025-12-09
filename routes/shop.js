const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    // Flag to highlight the shop navigation item as active in the view
    activeShop: true,
    productCSS: true,
    // Disable the default layout wrapper to render the view without additional templating
    // This can be omitted if no layout is configured by default
    layout: false
  });
});

module.exports = router;

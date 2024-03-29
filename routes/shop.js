const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

 router.get('/', shopController.getIndex);

 router.get('/products', shopController.getProducts);

  router.get('/products/:productId',shopController.getproduct);

  router.get('/cart', shopController.getCart);

  router.post('/cart',shopController.postcart);
 
  router.post('/create-order', shopController.postOrder);

  router.post('/cart-delete-item', shopController.postCartDeleteProduct);

  router.get('/orders', shopController.getOrders);

module.exports = router;

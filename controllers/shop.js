const Product = require('../models/product');
const cart =require('../models/cart');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getproduct=(req,res,next)=>{
  const proid= req.params.productId;
  Product.findbyId(proid,product=>{
    res.render('shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postcart=(req, res, next)=>{
  const proid = req.body.productId;
  Product.findbyId(proid,(product)=>{
    Cart.addProduct(proid,product.price);
  })
  res.redirect('/cart');
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

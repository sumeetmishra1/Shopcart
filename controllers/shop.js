const Product = require('../models/product');
const cart =require('../models/cart');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>console.log(err));
}
exports.getproduct=(req,res,next)=>{
  const proid= req.params.productId;
  Product.findbyId(proid)
  .then(([product])=>{
    res.render('shop/product-detail',{
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    })
  })
  .catch(err=>console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err=>console.log(err));
 
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

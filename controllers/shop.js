const Product = require('../models/product');
//const cart =require('../models/cart');
//const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.find().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>console.log(err));
}
exports.getproduct=(req,res,next)=>{
  const proid= req.params.productId;
  Product.findById(proid)
  .then((product)=>{
    res.render('shop/product-detail',{
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  })
  .catch(err=>console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find().then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products=>{
      res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your Cart',
        products:products
      })
    })
  .catch(err=>console.log(err))
};

exports.postcart=(req, res, next)=>{
  const proid = req.body.productId;
  Product.findById(proid).then(product=>{
    return req.user.addToCart(product);
  })
  .then(result=>{
    res.redirect('/cart');
  })
 
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.postCartDeleteProduct=(req,res,next)=>{
  const productId=req.body.productId;
  req.user.deleteItemFromCart(productId)
  .then(result=>{
    res.redirect('/cart');
  })
}
exports.postOrder = (req,res,next)=>{
  req.user.addOrder()
  .then(result=>{
    res.redirect('/cart');
  })
}
exports.getOrders = (req, res, next) => {
  req.user
    .getOrder()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

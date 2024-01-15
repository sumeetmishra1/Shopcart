const Product = require('../models/product');
//const cart =require('../models/cart');
//const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products=>{
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
  Product.fetchAll().then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts()
    .then(products=>{
      res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your Cart',
        products:products
      })
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
    console.log(result);
  })
  // let fetchedCart;
  // let newQuantity=1;
  // req.user.getCart()
  // .then(cart=>{
  //   fetchedCart=cart;
  //   return cart.getProducts({where:{id:proid}});
  // })
  // .then(products=>{
  //   let product;
  //   if(products.length>0){
  //     product=products[0];
  //   }
  //   if(product){
  //     const oldQuantity=product.cartItem.quantity;
  //     newQuantity=oldQuantity+1;
  //     return product;
  //   }
  //   return Product.findByPk(proid)
  // })
  // .then(product=>{
  //     return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
  //   })
  //   .then(()=>{
  //     res.redirect('/cart');
  //   })
  //   .catch(err=>console.log(err))
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
exports.postCartDeleteProduct=(req,res,next)=>{
  const proid=req.body.productId;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:proid}});
  })
  .then(products=>{
    const product=products[0];
    return product.cartItem.destroy();
  })
  .then(result=>{
    res.redirect('/cart');
  })
}
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then(()=>{
    res.redirect('/');
  })
  .catch(err=>console.log(err));
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode =req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const proid=req.params.productId;
  Product.findbyId(proid,product=>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing : editMode,
      product :product
    });
  });
  
};
exports.postEditProduct=(req,res,next)=>{
  const proid=req.body.productId;
  const Updatedtitle = req.body.title;
  const UpdatedimageUrl = req.body.imageUrl;
  const Updatedprice = req.body.price;
  const Updateddescription = req.body.description;
  const Updatedproduct = new Product(proid,Updatedtitle, UpdatedimageUrl, Updateddescription, Updatedprice);
  Updatedproduct.save();
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postdeleteproduct=(req,res,next)=>{
  const proid=req.body.productId;
  Product.deleteById(proid);
  res.redirect('/admin/products');
}
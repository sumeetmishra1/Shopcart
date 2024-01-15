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
  const userId=req.user._id;
  const product = new Product({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:userId
  });
  product.save()
  .then((result)=>
  res.redirect('/')
  )
  .catch(err=>{
    console.log(err);
  })
 

};

exports.getEditProduct = (req, res, next) => {
  const editMode =req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const proid=req.params.productId;
  Product.findById(proid)
  .then(product=>{
    if(!product){
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
    editing : editMode,
    product :product
  })
})
.catch(err=>console.log(err))
};
exports.postEditProduct=(req,res,next)=>{
  const proid=req.body.productId;
  const Updatedtitle = req.body.title;
  const UpdatedimageUrl = req.body.imageUrl;
  const Updatedprice = req.body.price;
  const Updateddescription = req.body.description;
  Product.findById(proid).then(product=>{
    product.title=Updatedtitle,
    product.imageUrl=UpdatedimageUrl,
    product.price=Updatedprice
    product.description=Updateddescription
    return product.save()
  })
  .then(result=>{
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err))
  
}

exports.getProducts = (req, res, next) => {
Product.find().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .then(res=>console.log("done"))
  .catch(err=>console.log(err));
};

exports.postdeleteproduct=(req,res,next)=>{
  const proid=req.body.productId;
  Product.findByIdAndDelete(proid)
  .then(product=>{
    console.log('deleted');
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
  
}
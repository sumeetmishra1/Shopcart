const fs=require('fs');
const path=require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
module.exports =class Cart{
    static addProduct(id,productprice){
        fs.readFile(p,(err, data)=>{
            let cart ={ products: [], totalPrice: 0};
            if(!err){
                cart= JSON.parse(data);
            };
            const existingproductIndex =cart.products.findIndex(prod=> prod.id === id);
            const existingproduct =cart.products[existingproductIndex];
            let updatedproduct;
            if(existingproduct){
                updatedproduct={...existingproduct };
                updatedproduct.qty=updatedproduct.qty+1;
                cart.products=[...cart.products];
                cart.products[existingproductIndex]=updatedproduct;
            }
            else{
                updatedproduct= { id: id, qty:1 };
                cart.products=[...cart.products, updatedproduct];
            }
            cart.totalPrice=cart.totalPrice+productprice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            });
            
        })
    }
}
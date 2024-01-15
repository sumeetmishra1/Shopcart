const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;
class User{
    constructor(name,email,cart,id){
        this.name=name,
        this.email=email,
        this.cart=cart,
        this._id=id
    }
    save(){
        const db=getDb();
        return db.collection('users').insertOne(this)
    }
    addToCart(product){
        const cartProduct = this.cart.items.findIndex(cp=>{
            return cp.productId.toString() === product._id.toString();
        })
       let newQuantity=1;
       const updatedCartItems = [...this.cart.items];
       if(cartProduct>=0){
        newQuantity=this.cart.items[cartProduct].quantity+1;
        updatedCartItems[cartProduct].quantity = newQuantity;
       }
       else{
         updatedCartItems.push({productId: new ObjectId(product._id),quantity:newQuantity});
       }
        const updatedcart ={
            items:updatedCartItems
        };
        const db=getDb();
        return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set :{cart:updatedcart}}) 
    }
    getCart(){
        const db=getDb();
        const productIds=this.cart.items.map(i=>{
            return i.productId;
        });
        return db.collection('products').find({_id:{$in:productIds}}).toArray()
        .then(products=>{
            return products.map(p=>{
                return{
                    ...p,quantity:this.cart.items.find(i=>{
                        return i.productId.toString() === p._id.toString();
                    }).quantity
                }
            })
        })
    }
    deleteItemFromCart(productId){
        const updatedCartItems=this.cart.items.filter(item=>{
            return item.productId.toString() !== productId.toString();
        })
        const db=getDb();
        return db.collection('users').updateOne({_id:new ObjectId(this._id)},{$set :{cart:{items:updatedCartItems}}}) 

    }
    static findById(userId){
        const db=getDb();
        return db.collection('users').find({_id: new ObjectId(userId)}).next();
    }

}

module.exports=User;
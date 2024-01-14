const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class Product{
  constructor(title,price,image,description,id,userId){
    this.title=title,
    this.price=price,
    this.image=image,
    this.description=description,
    this._id=id ? new mongodb.ObjectId(id):null,
    this.userId=userId
  }
  save(){
    const db=getDb();
    let dbOp;
    if(this._id){
      dbOp=db.collection('products').updateOne({_id:this._id},{$set:this});
    }
    else{
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    })
  }
 static fetchAll(){
    const db=getDb();
    return db.collection('products').find().toArray()
    .then(res=>{
      return res;
    })
    .catch(err=>{
      console.log(err);
    })
  }
  static findById(prodId){
    const db=getDb();
    return db.collection('products').find({_id:new mongodb.ObjectId(prodId)})
    .next()
    .then(res=>{
      return res;
    })
    .catch(err=>{
      console.log(err);
    })
  }
  static delete(prodId){
    const db =getDb();
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
    .then(res=>{
      return res;
    })
    .catch(err=>{
      console.log(err);
    })
  }
}

module.exports=Product;
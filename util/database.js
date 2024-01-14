const Mongodb = require('mongodb');
require('dotenv').config();
const MongoClient =Mongodb.MongoClient;
let _db;
const DB_URL=process.env.DB_URL;
const mongoConnect=async (callback)=>{
    try{
        const client = await MongoClient.connect(DB_URL);
        _db=client.db('shop');
        console.log("Connected")
        callback();
    }
    catch(e){
        console.log(e.message)
    }
   
}
exports.getDb=()=>{
    if(_db){
        return _db;
    }
    else{
        throw 'database not connected'
    }
}
exports.mongoConnect=mongoConnect;
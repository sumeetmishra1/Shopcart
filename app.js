const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//const Cart=require('./models/cart');
//const CartItem=require('./models/cart-item');
//const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
//const Product =require('./models/product')
const User=require('./models/user')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('65a3cb8e1d0eacf651ae4140')
    .then(user=>{
        req.user=new User(user.name,user.email,user.cart,user._id);
        next();
    })
    .catch(err=>console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//app.use(errorController.get404);

mongoConnect(()=>{
    app.listen(3000);
})
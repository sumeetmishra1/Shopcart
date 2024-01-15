const path = require('path');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User=require('./models/user')
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('65a530862d0f5b7b106cbf3c')
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
const DB_URL=process.env.DB_URL;
mongoose.connect(DB_URL)
.then(result=>{
    app.listen(3000);
    console.log('connected')
})
.catch(err=>{
    console.log(err);
})
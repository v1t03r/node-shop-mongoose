const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFound404 = require('./routes/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findByPk('6019bea6ac2ecef9b18854d1')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound404);

mongoose
  .connect
  ("mongodb+srv://vp3node:WavntWpLBnvmeili@clustershop.i3wim.mongodb.net/nodejs-shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
    console.log('Connected successfully!');
  })
  .catch(err => {
    console.log(err);
  });


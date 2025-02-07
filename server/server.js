const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/Auth-route')
require('dotenv').config();
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductRouter = require('./routes/shop/products-routes')

const shopCartRouter = require("./routes/shop/cart-routes")

const shopAddressRouter = require("./routes/shop/address-routes")

const ShopOrderRouter = require("./routes/shop/order-routed")

const adminOrderRouter = require("./routes/admin/order-routes")

const shopSearchRouter = require('./routes/shop/search-routes')

const shopReviewRouter = require('./routes/shop/review-routes')

const shopEmail = require('./routes/shop/email-routes')

const shopProfile = require('./routes/shop/profile-routes')

const commonFeatureRouter = require('./routes/common/feature-routes')

const shopRefferal = require ('./routes/shop/refferal-routes');


const addInfluencers = require ('./routes/influencer/influencer-route')

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/erika', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Express',
      'Pragma'
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/admin/influencer', addInfluencers);

app.use('/api/shop/products', shopProductRouter);

app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', ShopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/shop/contact', shopEmail);
app.use('/api/common/feature', commonFeatureRouter);
app.use('/api/common/profile', shopProfile);
app.use('/api/shop/refferal', shopRefferal);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

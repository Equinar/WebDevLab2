const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//Mongoose Connection - connect directly to the marketplace database
mongoose.connect('mongodb+srv://hodginsbusiness:RA4Lbc5cwSTT8fJR@301332994a2.vkv4pki.mongodb.net/Marketplace', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
  

// Middleware
app.use(cors());
app.use(express.json());

// Main page display
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application" });
  });

 //Controller
const productCtrl = require('./controllers/products.controller.js');
app.use('/api/products', productCtrl);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const express = require('express');
const router = express.Router();
const Product = require('../models/products.model.js');
//did not seperate out the routes as I feel it makes the document much harder to read
// GET - products by name, if no query is given, i.e. /api/products , it returns all items
router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
      const products = await Product.find({ name: { $regex: new RegExp(name, 'i') } });
      res.json(products);
    } catch (error) {
      res.status(500).send('Error searching for products');
    }
  });

  // GET - product by ID
router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        res.status(404).send('Product not found');
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).send('Error fetching the product by id');
    }
  });

// POST - add new product
router.post('/', async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  if (!name || !price || !quantity || !category) {
    return res.status(400).send('Invalid input');
  }

  const product = new Product({
    name,
    description,
    price,
    quantity,
    category
  });

  try {
    await product.save();
    res.send('Product Added');
  } catch (error) {
    res.status(500).send('Error creating a product');
  }
});

// PUT - update product by ID
router.put('/:id', async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      quantity,
      category
    }, { new: true });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.send('Product updated');
  } catch (error) {
    res.status(500).send('Error removing the product');
  }
});

// DELETE - remove product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send('Product removed');
  } catch (error) {
    res.status(500).send('Error deleting the product');
  }
});

// DELETE - remove all products
router.delete('/', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.send('All products removed');
  } catch (error) {
    res.status(500).send('Error deleting all products');
  }
});


  

module.exports = router;

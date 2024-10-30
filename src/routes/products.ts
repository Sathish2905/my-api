import express from 'express';
import Product, { IProduct } from '../models/Product';

const router = express.Router();

// Error handler middleware
const handleError = (res: express.Response, error: unknown) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(400).json({ error: 'An unknown error occurred' });
  }
};

// Create Product
router.post('/', async (req, res) => {
  try {
    const { title, description, price, image, categoryId, subCategoryId } = req.body;
    const newProduct: IProduct = new Product({ title, description, price, image, categoryId, subCategoryId });
    const savedProduct = await Product.create(newProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    handleError(res, error);
  }
});

// Get Products with optional filters
router.get('/', async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.query;
    let query = {};

    if (categoryId && subcategoryId) {
      query = { categoryId, subCategoryId: subcategoryId };
    } else if (categoryId) {
      query = { categoryId };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    handleError(res, error);
  }
});

// Get Product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    handleError(res, error);
  }
});

// Update Product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    handleError(res, error);
  }
});

// Delete Product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(deletedProduct);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;

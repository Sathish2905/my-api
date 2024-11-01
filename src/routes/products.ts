import express from 'express';
import Product, { IProduct } from '../models/Product';
import { CrudController } from '../utils/crudController';
import { handleError, sendSuccess } from '../utils/routeHelpers';

const router = express.Router();
const productController = new CrudController<IProduct>(Product, 'Product');

// Create Product
router.post('/', async (req, res) => {
  try {
    const { title, description, price, image, categoryId, subCategoryId } = req.body;
    
    // Validate required fields
    if (!title || !price) {
      return res.status(400).json({ error: 'Title and price are required' });
    }

    const newProduct = await Product.create({ 
      title, 
      description, 
      price, 
      image, 
      categoryId, 
      subCategoryId 
    });
    
    sendSuccess(res, newProduct, 201);
  } catch (error) {
    handleError(res, error);
  }
});

// Get Products with optional filters
router.get('/', async (req, res) => {
  try {
    const { categoryId, subCategoryId, minPrice, maxPrice, search } = req.query;
    
    // Type-safe filter construction
    interface ProductFilter {
      categoryId?: string;
      subCategoryId?: string;
      price?: { $gte?: number; $lte?: number };
      $or?: Array<{ [key: string]: any }>;
    }

    const filter: ProductFilter = {};

    if (categoryId) filter.categoryId = categoryId as string;
    if (subCategoryId) filter.subCategoryId = subCategoryId as string;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter);
    sendSuccess(res, products);
  } catch (error) {
    handleError(res, error);
  }
});

// Use existing controller for standard CRUD operations
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

export default router;

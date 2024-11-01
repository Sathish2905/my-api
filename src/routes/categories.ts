import express from 'express';
import Category, { ICategory } from '../models/Category';
import SubCategory, { ISubCategory } from '../models/SubCategory';

const router = express.Router();

// Create Category
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newCategory: ICategory = new Category({ name });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});
// Get All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    const categoriesWithSubs = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await SubCategory.find({ categoryId: category._id });
        return {
          ...category.toObject(),
          subcategories
        };
      })
    );
    res.json(categoriesWithSubs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get Category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update Category
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(updatedCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Delete Category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ error: 'Category not found' });
    res.json(deletedCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Create SubCategory
router.post('/:categoryId/subcategories', async (req, res) => {
  const { name } = req.body;
  const { categoryId } = req.params;
  const newSubCategory: ISubCategory = new SubCategory({ name, categoryId });

  try {
    const savedSubCategory = await newSubCategory.save();
    res.status(201).json(savedSubCategory);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;

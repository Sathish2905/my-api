import express from 'express';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { CrudController } from '../utils/crudController';
import { handleError, sendSuccess } from '../utils/routeHelpers';

const router = express.Router();
const categoryController = new CrudController(Category, 'Category');

// Use the base CRUD operations
router.post('/', categoryController.create);
router.get('/:id', categoryController.getById);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

// Custom implementation for getting categories with subcategories
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
    return sendSuccess(res, categoriesWithSubs);
  } catch (error) {
    return handleError(res, error);
  }
});

// Create SubCategory
router.post('/:categoryId/subcategories', async (req, res) => {
  try {
    const newSubCategory = new SubCategory({
      name: req.body.name,
      categoryId: req.params.categoryId
    });
    const saved = await newSubCategory.save();
    return sendSuccess(res, saved, 201);
  } catch (error) {
    return handleError(res, error);
  }
});

export default router;

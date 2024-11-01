import express from 'express';
import SubCategory, { ISubCategory } from '../models/SubCategory';
import { CrudController } from '../utils/crudController';

const router = express.Router();
const subCategoryController = new CrudController<ISubCategory>(SubCategory, 'SubCategory');

// Use base delete operation
router.get('/:id', subCategoryController.getById);
router.put('/:id', subCategoryController.update);
router.delete('/:id', subCategoryController.delete);

export default router;
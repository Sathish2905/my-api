import express from 'express';
import SubCategory, { ISubCategory } from '../models/SubCategory';
import { CrudController } from '../utils/crudController';

const router = express.Router();
const subCategoryController = new CrudController<ISubCategory>(SubCategory, 'SubCategory');

// Use base delete operation
router.delete('/:id', subCategoryController.delete);

export default router;
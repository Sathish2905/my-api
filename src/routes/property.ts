import express from 'express';
import Property, { IProperty } from '../models/Property';
import { CrudController } from '../utils/crudController';
import { handleError, sendSuccess } from '../utils/routeHelpers';

const router = express.Router();
const propertyController = new CrudController<IProperty>(Property, 'Property');

// Get Property by Name
router.get('/name/:name', async (req, res) => {
  try {
    const property = await Property.findOne({ name: req.params.name });
    if (!property) return res.status(404).json({ error: 'Property not found' });
    return sendSuccess(res, property);
  } catch (error) {
    return handleError(res, error);
  }
});

// Use base CRUD operations for remaining routes
router.post('/', propertyController.create);
router.get('/', propertyController.getAll);
router.get('/:id', propertyController.getById);
router.put('/:id', propertyController.update);
router.delete('/:id', propertyController.delete);

export default router;

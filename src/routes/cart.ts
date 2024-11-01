import express from 'express';
import CartItem, { ICartItem } from '../models/CartItem';
import { CrudController } from '../utils/crudController';
import { handleError, sendSuccess } from '../utils/routeHelpers';

const router = express.Router();
const cartController = new CrudController<ICartItem>(CartItem, 'CartItem');

// Add Item to Cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity, userId }: ICartItem = req.body;
    const newCartItem = new CartItem({ productId, quantity, userId });
    const savedCartItem = await newCartItem.save();
    return sendSuccess(res, savedCartItem, 201);
  } catch (error) {
    return handleError(res, error);
  }
});

// Get Cart Items by User
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId }).populate('productId');
    return sendSuccess(res, cartItems);
  } catch (error) {
    return handleError(res, error);
  }
});

// Update Cart Item Quantity
router.patch('/:id', async (req, res) => {
  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(
      req.params.id, 
      { quantity: req.body.quantity }, 
      { new: true }
    );
    return sendSuccess(res, updatedCartItem);
  } catch (error) {
    return handleError(res, error);
  }
});

// Use base delete operation
router.delete('/:id', cartController.delete);

export default router;

import express from 'express';
import WishlistItem, { IWishlistItem } from '../models/WishlistItem';
import { CrudController } from '../utils/crudController';
import { handleError, sendSuccess } from '../utils/routeHelpers';

const router = express.Router();
const wishlistController = new CrudController<IWishlistItem>(WishlistItem, 'WishlistItem');

// Add Item to Wishlist
router.post('/', async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const newWishlistItem = new WishlistItem({ productId, userId });
    const savedWishlistItem = await newWishlistItem.save();
    return sendSuccess(res, savedWishlistItem, 201);
  } catch (error) {
    return handleError(res, error);
  }
});

// Get Wishlist by User
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const wishlistItems = await WishlistItem.find({ userId }).populate('productId');
    return sendSuccess(res, wishlistItems);
  } catch (error) {
    return handleError(res, error);
  }
});

// Use base delete operation
router.delete('/:id', wishlistController.delete);

export default router;

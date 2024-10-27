import express from 'express';
import WishlistItem, { IWishlistItem } from '../models/WishlistItem';

const router = express.Router();

// Add Item to Wishlist
router.post('/', async (req, res) => {
  const { productId, userId } = req.body;
  const newWishlistItem: IWishlistItem = new WishlistItem({ productId, userId });

  try {
    const savedWishlistItem = await newWishlistItem.save();
    res.status(201).json(savedWishlistItem);
} catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get Wishlist by User
router.get('/:userId', async (req, res) => {
  try {
    const wishlistItems = await WishlistItem.find({ userId: req.params.userId });
    res.json(wishlistItems);
} catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Remove Item from Wishlist
router.delete('/:id', async (req, res) => {
  try {
    const deletedWishlistItem = await WishlistItem.findByIdAndDelete(req.params.id);
    if (!deletedWishlistItem) return res.status(404).json({ error: 'WishlistItem not found' });
    res.json(deletedWishlistItem);
} catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;

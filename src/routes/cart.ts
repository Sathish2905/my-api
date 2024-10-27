import express, { Request, Response } from 'express';
import CartItem, { ICartItem } from '../models/CartItem';

const router = express.Router();

// Add Item to Cart
router.post('/', async (req: Request, res: Response) => {
  const { productId, quantity, userId }: ICartItem = req.body;
  const newCartItem: ICartItem = new CartItem({ productId, quantity, userId });

  try {
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Get Cart Items by User
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId });
    res.json(cartItems);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Update Cart Item Quantity
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const updatedCartItem = await CartItem.findByIdAndUpdate(req.params.id, { quantity: req.body.quantity }, { new: true });
    if (!updatedCartItem) return res.status(404).json({ error: 'CartItem not found' });
    res.json(updatedCartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Remove Cart Item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedCartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) return res.status(404).json({ error: 'CartItem not found' });
    res.json(deletedCartItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

export default router;

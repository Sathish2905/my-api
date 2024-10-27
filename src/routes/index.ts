import express from 'express';
import userRoutes from './users';
import productRoutes from './products';
import categoryRoutes from './categories';
import cartRoutes from './cart';
import wishlistRoutes from './wishlist';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);

export default router;

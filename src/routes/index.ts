import express from 'express';
import userRoutes from './users';
import productRoutes from './products';
import categoryRoutes from './categories';
import subCategoryRoutes from './subCategories';
import cartRoutes from './cart';
import wishlistRoutes from './wishlist';
import propertyRoutes from './property';

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/subCategories', subCategoryRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/property', propertyRoutes);

export default router;

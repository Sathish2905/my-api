import express from 'express';
import User, { IUser } from '../models/User';
import { CrudController } from '../utils/crudController';
import { handleError, sendSuccess } from '../utils/routeHelpers';

const router = express.Router();
const userController = new CrudController<IUser>(User, 'User');

// User Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    return sendSuccess(res, userResponse);
  } catch (error) {
    return handleError(res, error);
  }
});

// Create User with password handling
router.post('/', async (req, res) => {
  const { username, password, role } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const newUser = new User({ username, password, role });
    const savedUser = await newUser.save();
    const userResponse = savedUser.toObject();
    delete userResponse.password;
    return sendSuccess(res, userResponse, 201);
  } catch (error) {
    return handleError(res, error);
  }
});

// Use base operations for remaining routes
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;

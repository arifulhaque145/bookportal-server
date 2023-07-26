import express from 'express';
import auth from '../../middlewares/auth';
import { Roles } from './users.constant';
import { userController } from './users.controller';

const router = express.Router();

// my-profile
router.get(
  '/my-profile',
  auth(Roles.User),
  userController.getUserProfile
);

router.patch(
  '/my-profile',
  auth(Roles.User),
  userController.updateUserProfile
);

router.get('/', auth(Roles.Admin), userController.getAllUsers);
router.get('/:id', auth(Roles.Admin), userController.getUserById);

router.post('/create-user', userController.createUser);

// router.patch('/price/:id', userController.updateIncome);
router.patch('/:id', auth(Roles.Admin), userController.updateUser);

router.delete('/:id', auth(Roles.Admin), userController.deleteUser);

export const userRouters = router;

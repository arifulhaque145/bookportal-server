import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { Roles } from '../users/users.constant';
import { ListController } from './list.controller';
import { ListValidation } from './list.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ListValidation.createListZodSchema),
  // auth(UserRoles.Buyer),
  auth(Roles.User),
  ListController.createList
);

router.get('/:id', auth(Roles.User), ListController.getListById);
router.get('/', auth(Roles.User), ListController.getList);

export const orderRouters = router;

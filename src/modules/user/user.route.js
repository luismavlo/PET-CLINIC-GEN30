import express from 'express';
import {
  deleteUser,
  findAllUser,
  findOneUser,
  login,
  register,
  updateUser,
} from './user.controller.js';

import { protect, validateExistUser } from './user.middleware.js';

export const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/', findAllUser);

router
  .route('/:id')
  .get(protect, validateExistUser, findOneUser)
  .patch(validateExistUser, updateUser)
  .delete(validateExistUser, deleteUser);

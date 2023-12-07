import express from 'express';
import { router as userRouter } from '../modules/user/user.route.js';
import { router as petRouter } from '../modules/pet/pet.route.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/pets', petRouter);

import express from 'express';
import { router as userRouter } from '../modules/user/user.route.js';
import { router as petRouter } from '../modules/pet/pet.route.js';
import { router as medicRouter } from '../modules/medic/medic.route.js';
import { router as appointmentRouter } from '../modules/appointment/appointment.route.js';
import { protect } from '../modules/user/user.middleware.js';

export const router = express.Router();

router.use('/users', userRouter);
router.use(protect);
router.use('/pets', petRouter);
router.use('/medics', medicRouter);
router.use('/appointments', appointmentRouter);

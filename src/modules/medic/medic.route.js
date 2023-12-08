import express from 'express';
import {
  createMedic,
  deleteMedic,
  findAllMedics,
  findOneMedic,
  updateMedic,
} from './medic.controller.js';
import { validExistMedic } from './medic.middleware.js';

export const router = express.Router();

router.route('/').get(findAllMedics).post(createMedic);

router
  .route('/:id')
  .get(validExistMedic, findOneMedic)
  .patch(validExistMedic, updateMedic)
  .delete(validExistMedic, deleteMedic);

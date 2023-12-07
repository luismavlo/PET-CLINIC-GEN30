import express from 'express';
import {
  findAllPets,
  createPet,
  findOnePet,
  updatePet,
  deletePet,
} from './pet.controller.js';
import { validateExistPet } from './pet.middleware.js';

export const router = express.Router();

router.route('/').get(findAllPets).post(createPet);

router
  .route('/:id')
  .get(validateExistPet, findOnePet)
  .patch(validateExistPet, updatePet)
  .delete(validateExistPet, deletePet);

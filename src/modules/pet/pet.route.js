import express from 'express';
import {
  findAllPets,
  createPet,
  findOnePet,
  updatePet,
  deletePet,
} from './pet.controller.js';
import { validateExistPet } from './pet.middleware.js';
import { uploadSingle } from '../../config/plugins/upload-files.plugin.js';

export const router = express.Router();

router.route('/')
  .get(findAllPets)
  .post(uploadSingle('photo') ,createPet);

router
  .route('/:id')
  .get(validateExistPet, findOnePet)
  .patch(validateExistPet, updatePet)
  .delete(validateExistPet, deletePet);

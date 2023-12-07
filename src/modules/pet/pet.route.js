import express from 'express';
import { findAllPets, createPet } from './pet.controller.js';

export const router = express.Router();

router.route('/').get(findAllPets).post(createPet);

import express from 'express';
import {
  deleteAppointment,
  findAllAppointments,
  findOneAppointment,
  scheduleAppointment,
  updateAppointment
} from './appointment.controller.js';
import { validExistAppointment } from './appointment.middleware.js';

export const router = express.Router();

router.get('/', findAllAppointments);

router.post('/schedule-appointment', scheduleAppointment);

router
    .route('/:id')
    .get(validExistAppointment, findOneAppointment)
    .patch(validExistAppointment, updateAppointment)
    .delete(validExistAppointment, deleteAppointment);





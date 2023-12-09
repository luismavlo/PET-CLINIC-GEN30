import express from 'express';
import { scheduleAppointment } from './appointment.controller.js';

export const router = express.Router();

// router.get('/', findAllAppointments);

router.post('/schedule-appointment', scheduleAppointment);

// router.route('/:id').get().patch().delete()

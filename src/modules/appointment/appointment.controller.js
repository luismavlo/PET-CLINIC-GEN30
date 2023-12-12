import { catchAsync } from '../../common/errors/catchAsync.js';
import { AppError } from '../../common/errors/appError.js';
import { validateAppointment } from './appointmnet.schema.js';
import { PetService } from './../pet/pet.service.js';
import { MedicService } from '../medic/medic.service.js';
import { AppointmentService } from './appointmnet.service.js';

export const scheduleAppointment = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, appointmentData } = validateAppointment(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const [pet, medic] = await Promise.all([
    await PetService.findOne(appointmentData.petId),
    await MedicService.findOne(appointmentData.medicId),
  ]);

  if (!pet) {
    return next(
      new AppError(`Pet with id: ${appointmentData.petId} not found`, 404)
    );
  }

  if (!medic) {
    return next(
      new AppError(`Medic with id: ${appointmentData.medicId} not found`, 404)
    );
  }

  const appointments = await AppointmentService.findAppointmentByTimeSQL(
    appointmentData.medicId,
    req.body.durationMinutes,
    appointmentData.startTime
  );


  if (appointments.length >= 1) {
     return next(
       new AppError('The doctor already has an appointmnet assigned', 409)
    );
  }

  const appointmentCreated = await AppointmentService.create(appointmentData);

  return res.status(201).json(appointmentCreated);
});


export const findAllAppointments = catchAsync(async(req, res, next) => {
  const appointments = await AppointmentService.findAllAppointment();

  return res.status(200).json(appointments)
})

export const findOneAppointment = catchAsync(async(req,res,next) => {
  const { appointment } = req;

  return res.status(200).json(appointment)
})
export const deleteAppointment = catchAsync(async(req,res,next) => {
  const { appointment } = req;

  //TODO: no se deberia poder eliminar una cita completada.

  //TODO: solo se puede cancelar una cita antes de la hora de la cita.

  await AppointmentService.delete(appointment)

  return res.status(204).json(null)
})

export const updateAppointment = catchAsync(async (req,res,next) => {
  const { appointment } = req;

  await AppointmentService.update(appointment);

  //TODO: no deberian completar una cita que ha sido cancelada.

  return res.status(200).json({
    message: 'the appointment has been completed'
  })
})
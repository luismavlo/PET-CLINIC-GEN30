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

  // console.log(appointmentData.startTime);

  // const appointment = await AppointmentService.findAppointmentByTime(
  //   appointmentData.medicId,
  //   req.body.durationMinutes,
  //   appointmentData.startTime
  // );

  const appointment = await AppointmentService.findAppointmentByTimeSQL(
    appointmentData.medicId,
    req.body.durationMinutes,
    appointmentData.startTime
  );

  // console.log(appointment);

  // if (appointment) {
  //   return next(
  //     new AppError('The doctor already has an appointmnet assigned', 409)
  //   );
  // }

  // const appointmentCreated = await AppointmentService.create(appointmentData);

  return res.status(201).json({ appointment });
});

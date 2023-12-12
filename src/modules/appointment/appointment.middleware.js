import { catchAsync } from '../../common/errors/catchAsync.js';
import { AppointmentService } from './appointmnet.service.js';
import { AppError } from '../../common/errors/appError.js';


export const validExistAppointment = catchAsync(async(req,res,next) => {
  const { id } = req.params;

  const appointment = await AppointmentService.findOneAppointment(id);

  if(!appointment){
    return next(new AppError('Appointment not found'));
  }

  req.appointment = appointment;
  next()
})
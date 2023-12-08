import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MedicService } from './medic.service.js';

export const validExistMedic = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const medic = await MedicService.findOne(id);

  if (!medic) {
    return next(new AppError(`Medic with id: ${id} not found`, 404));
  }

  req.medic = medic;
  next();
});

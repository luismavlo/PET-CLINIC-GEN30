import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { UserService } from './user.service.js';

export const validateExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await UserService.findOne(id);

  if (!user) {
    return next(new AppError(`user with id: ${id} not found`, 404));
  }

  req.user = user;
  next();
});

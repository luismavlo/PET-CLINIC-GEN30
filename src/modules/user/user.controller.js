import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateUser, validatePartialUser } from './user.schema.js';
import { UserService } from './user.service.js';

export const register = catchAsync(async (req, res, next) => {
  // const { hasError, errorMessages, userData } = validateUser(req.body);

  // if (hasError) {
  //   return res.status(422).json({
  //     status: 'error',
  //     message: errorMessages,
  //   });
  // }

  const user = await UserService.create(req.body);

  return res.status(201).json(user);
});

export const login = catchAsync(async (req, res) => {});

export const findAllUser = catchAsync(async (req, res, next) => {
  const users = await UserService.findAll();

  return res.status(200).json(users);
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json(user);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validatePartialUser(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const userUpdated = await UserService.update(user, userData);

  return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await UserService.delete(user);

  return res.status(204).json();
});

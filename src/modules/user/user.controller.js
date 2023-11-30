import { validateUser, validatePartialUser } from './user.schema.js';
import { UserService } from './user.service.js';

export const register = async (req, res) => {
  try {
    const { hasError, errorMessages, userData } = validateUser(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }

    const user = await UserService.create(userData);

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

export const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

export const findAllUser = async (req, res) => {
  try {
    const users = await UserService.findAll();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { user } = req;

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await UserService.delete(user);

    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

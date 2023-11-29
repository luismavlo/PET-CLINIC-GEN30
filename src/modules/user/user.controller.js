import { validateUser } from './user.schema.js';

export const register = async (req, res) => {
  try {
    const { hasError, errorMessages, userData } = validateUser(req.body);

    if (hasError) {
      return res.status(422).json({
        status: 'error',
        message: errorMessages,
      });
    }

    return res.json(userData);
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went very wrong! 🧨',
      error,
    });
  }
};

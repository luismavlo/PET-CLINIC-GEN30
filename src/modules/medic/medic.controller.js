import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMedic, validatePartialMedic } from './medic.schema.js';
import { MedicService } from './medic.service.js';

export const findAllMedics = catchAsync(async (req, res, next) => {
  const medics = await MedicService.findAll();

  return res.status(200).json(medics);
});

export const createMedic = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, medicData } = validateMedic(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const medic = await MedicService.create(medicData);

  return res.status(201).json(medic);
});

export const findOneMedic = catchAsync(async (req, res, next) => {
  const { medic } = req;

  return res.status(200).json(medic);
});

export const updateMedic = catchAsync(async (req, res, next) => {
  const { medic } = req;

  const { hasError, errorMessages, medicData } = validatePartialMedic(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  await MedicService.update(medic, medicData);

  return res.status(200).json({
    message: 'the medic has been updated',
  });
});

export const deleteMedic = catchAsync(async (req, res, next) => {
  const { medic } = req;

  await MedicService.delete(medic);

  return res.status(204).json(null);
});

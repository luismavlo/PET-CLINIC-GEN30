import { catchAsync } from '../../common/errors/catchAsync.js';
import { generateUUID } from '../../config/plugins/generate-uuid.plugin.js';
import { httpClient } from '../../config/plugins/http-client.plugin.js';
import { validatePartialPet, validatePet } from './pet.schema.js';
import { PetService } from './pet.service.js';
import { UploadFile } from '../../common/utils/upload-files-cloud.js';

export const findAllPets = catchAsync(async (req, res, next) => {
  const pets = await PetService.findAll();

  return res.status(200).json(pets);
});

export const createPet = catchAsync(async (req, res, next) => {

  const dataBody = {
    name: req.body.name,
    birthdate: req.body.birthdate,
    specie: req.body.specie,
    race: req.body.race,
    userId: +req.body.userId
  }

  const { hasError, errorMessages, petData } = validatePet(dataBody);


  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const path = `pet/${generateUUID()}-${req.file.originalname}`;

  const photoUrl = await UploadFile.uploadToFirebase(
    path,
    req.file.buffer
  )

  const medicalCardNumber = generateUUID();

  const results = await httpClient.get(
    `http://localhost:3100/api/v1/genetic-diseases?specie=${petData.specie}`
  );

  const diseases = results.geneticDiseases.map((disease) => disease.name);

  petData.medicalCardNumber = medicalCardNumber;
  petData.genetic_diseases = diseases;
  petData.photo = photoUrl;

  const pet = await PetService.create(petData);

  return res.status(201).json(pet);
});

export const findOnePet = catchAsync(async (req, res, next) => {
  const { pet } = req;

  return res.status(200).json(pet);
});

export const updatePet = catchAsync(async (req, res, next) => {
  const { pet } = req;
  const { hasError, errorMessages, petData } = validatePartialPet(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  await PetService.update(pet, petData);

  return res.status(200).json({
    message: 'the pet has been updated successfully!',
  });
});

export const deletePet = catchAsync(async (req, res, next) => {
  const { pet } = req;

  await PetService.delete(pet);

  return res.status(204).json(null);
});

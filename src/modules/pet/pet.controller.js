import { catchAsync } from '../../common/errors/catchAsync.js';
import { generateUUID } from '../../config/plugins/generate-uuid.plugin.js';
import { httpClient } from '../../config/plugins/http-client.plugin.js';
import { validatePet } from './pet.schema.js';
import { PetService } from './pet.service.js';

export const findAllPets = catchAsync(async (req, res, next) => {});

export const createPet = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, petData } = validatePet(req.body);

  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }

  const medicalCardNumber = generateUUID();

  const results = await httpClient.get(
    `http://localhost:3100/api/v1/genetic-diseases?specie=${petData.specie}`
  );

  const diseases = results.geneticDiseases.map((disease) => disease.name);

  petData.medicalCardNumber = medicalCardNumber;
  petData.genetic_diseases = diseases;

  const pet = await PetService.create(petData);

  return res.status(201).json(pet);
});

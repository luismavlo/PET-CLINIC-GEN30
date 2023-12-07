import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

export const petSchema = z.object({
  name: z.string().min(3).max(60),
  birthdate: z.string(),
  specie: z.string().min(3).max(60),
  race: z.string().min(3).max(60),
  userId: z.number(),
});

export function validatePet(data) {
  const result = petSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: petData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    petData,
  };
}

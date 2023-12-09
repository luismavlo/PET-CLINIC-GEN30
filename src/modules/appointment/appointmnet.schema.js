import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const appointmentSchema = z.object({
  startTime: z.string(),
  reason: z.string().min(10),
  petId: z.number(),
  medicId: z.number(),
});

export function validateAppointment(data) {
  const result = appointmentSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: appointmentData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    appointmentData,
  };
}

import Pet from './pet.model.js';

export class PetService {
  static async create(data) {
    return await Pet.create(data);
  }
}

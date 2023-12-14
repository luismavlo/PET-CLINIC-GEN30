import Medic from './medic.model.js';
import Appointment from '../appointment/appointment.model.js';
import Pet from '../pet/pet.model.js';
import User from '../user/user.model.js';

export class MedicService {
  static async findOne(id) {
    return await Medic.findOne({
      where: {
        id: id,
        status: true,
      },
    });
  }

  static async findAll() {
    return await Medic.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: Appointment,
          where: {
            status: 'pending'
          },
          required: false,
          include:[
            {
              model: Pet,
              include: [{ model: User, attributes: ['name', 'dni'] }]
            },
          ],
        }
      ]
    });
  }

  static async create(data) {
    return await Medic.create(data);
  }

  static async update(medic, data) {
    return await medic.update(data);
  }

  static async delete(medic) {
    return await medic.update({ status: false });
  }
}

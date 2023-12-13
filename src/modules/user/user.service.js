import User from './user.model.js';
import Pet from '../pet/pet.model.js';

export class UserService {
  static async findOne(id) {
    return await User.findOne({
      where: {
        id: id,
        status: true,
      },
    });
  }

  static async findAll() {
    return await User.findAll({
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'createdAt',
          'updatedAt',
          'status',
        ],
      },
      where: {
        status: true,
      },
      include: [
        {
          model: Pet,
        }
      ]
    });
  }

  static async create(data) {
    return await User.create(data);
  }

  static async update(user, data) {
    return await user.update(data);
  }

  static async delete(user) {
    return await user.update({ status: false });
  }

  static async findOneByEmail(email) {
    return await User.findOne({
      where: {
        status: true,
        email: email,
      },
    });
  }
}

import User from '../../modules/user/user.model.js';
import Appointment from '../../modules/appointment/appointment.model.js';
import Pet from '../../modules/pet/pet.model.js';
import Medic from '../../modules/medic/medic.model.js';


export const initModel = () => {

  User.hasMany(Pet, { foreignKey: 'user_id' });
  Pet.belongsTo(User, { foreignKey: 'user_id' });

  Pet.hasMany(Appointment, { foreignKey: 'pet_id'});
  Appointment.belongsTo(Pet,{ foreignKey: 'pet_id'});

  Medic.hasMany(Appointment, { foreignKey: 'medic_id'});
  Appointment.belongsTo(Medic, {foreignKey: 'medic_id'});


}


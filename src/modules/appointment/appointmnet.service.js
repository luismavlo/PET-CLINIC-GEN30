import { Op } from 'sequelize';
import Appointment from './appointment.model.js';
import { sequelize } from '../../config/database/database.js';
import { QueryTypes } from 'sequelize';

export class AppointmentService {
  static async create(data) {
    return await Appointment.create(data);
  }

  static async findAppointmentByTime(medicId, durationMinutes = 30, startTime) {
    const appointments = await Appointment.findAll({
      attributes: ['start_time'],
      where: {
        medicId: medicId,
        status: 'pending',
      },
      raw: true,
    });

    //TODO: Encontrar almenos un tiempo del arreglo que este detro de el startTime inicial y el startFinal new Date( new Date(startTime).getTime() + durationMinutes*60*1000)

    console.log(appointments);

    // if(appointment)
  }

  static async findAppointmentByTimeSQL(
    medicId,
    durationMinutes = 30,
    startTime
  ) {
    const appointments = await sequelize.query(
      'SELECT * FROM appointments WHERE medic_id = :medicId and status = :status and start_time >= :startTime',
      {
        type: QueryTypes.SELECT,
        replacements: {
          status: 'pending',
          medicId: medicId,
          startTime: startTime,
        },
      }
    );

    return appointments;
  }
}

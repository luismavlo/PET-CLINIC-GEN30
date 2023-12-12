import { Op } from 'sequelize';
import Appointment from './appointment.model.js';
import { sequelize } from '../../config/database/database.js';
import moment from 'moment-timezone';
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

    const databaseTimeZone = 'US/Eastern';
    const startMoment = moment(startTime).tz(databaseTimeZone);
    const endMoment = startMoment.clone().add(durationMinutes, 'minutes')

    const exactMatchAppointments = await sequelize.query(
      'SELECT * FROM appointments WHERE medic_id = :medicId and status = :status and start_time = :startTime',
      {
        type: QueryTypes.SELECT,
        replacements: {
          status: 'pending',
          medicId: medicId,
          startTime: startMoment.toISOString(),
        },
      }
    );


    if(exactMatchAppointments.length >= 1){
      return exactMatchAppointments;
    }

    const overlappingAppointments = await sequelize.query(
      "SELECT * FROM appointments WHERE medic_id = :medicId AND status = :status AND start_time < :endTime AND start_time + INTERVAL '30 minutes' > :startTime ",
      {
        type: QueryTypes.SELECT,
        replacements: {
          status: 'pending',
          medicId: medicId,
          endTime: endMoment.toISOString(),
          startTime: startMoment.toISOString()
        }
      }
    )

    return overlappingAppointments;
  }

  static async findOneAppointment(id){
    return await Appointment.findOne({
      where: {
        id: id,
        status: 'pending'
      }
    })
  }

  static async findAllAppointment(id){
    return await Appointment.findAll({
      where: {
        status: 'pending'
      }
    })
  }

  static async delete(appointment){
    return await appointment.update({ status: 'cancelled' })
  }

  static async update(appointment) {
    return await appointment.update({ status: 'completed'})
  }
}

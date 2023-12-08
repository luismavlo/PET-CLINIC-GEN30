import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Appointment = sequelize.define(
  'appointments',
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_time',
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'pet_id',
    },
    medicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'medic_id',
    },
    status: {
      type: DataTypes.ENUM('pending', 'cancelled', 'completed'),
      defaultValue: 'pending',
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['pet_id', 'start_time'],
      },
      {
        unique: true,
        fields: ['medic_id', 'start_time'],
      },
    ],
  }
);

export default Appointment;

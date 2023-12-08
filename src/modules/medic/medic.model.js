import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Medic = sequelize.define('medics', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  speciality: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Medic;

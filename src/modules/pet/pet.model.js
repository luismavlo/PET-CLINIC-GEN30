import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const Pet = sequelize.define('pets', {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  medicalCardNumber: {
    type: DataTypes.STRING(70),
    allowNull: false,
    field: 'medical_card_number',
  },
  specie: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  race: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
  },
  genetic_diseases: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Pet;

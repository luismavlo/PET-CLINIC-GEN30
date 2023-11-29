import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';

const User = sequelize.define('users', {
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
  surname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  genre: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('receptionist', 'client', 'developer'),
    allowNull: false,
    defaultValue: 'client',
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
});

export default User;

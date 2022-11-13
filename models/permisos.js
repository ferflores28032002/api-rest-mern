import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";

export const permisosModel = sequelize.define(
  "permisos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

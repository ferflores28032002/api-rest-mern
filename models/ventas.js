import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/conexion.js";

export const ventasModel = sequelize.define("ventas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  monto: {
    type: DataTypes.DOUBLE,
    defaultValue: "00.00",
  },
});

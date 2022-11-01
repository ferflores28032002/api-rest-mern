import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { empleadosModel } from "./empleados.js";

export const cargosModel = sequelize.define(
  "cargos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// Los cargos los tienen los empleados
cargosModel.hasMany(empleadosModel, {
  foreignKey: "idCargo",
  sourceKey: "id",
});

empleadosModel.belongsTo(cargosModel, {
  foreignKey: "idCargo",
  targetId: "id",
});

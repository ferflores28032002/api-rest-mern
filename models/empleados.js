import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { userModel } from "./user.js";

export const empleadosModel = sequelize.define("empleados", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  names: {
    type: DataTypes.STRING,
  },
  surnames: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  telephone: {
    type: DataTypes.INTEGER,
  },
  salary: {
    type: DataTypes.DOUBLE,
  },
  direction: {
    type: DataTypes.STRING,
  },
  sex: {
    type: DataTypes.STRING,
  },
});

// Hacemos las configuracion para que al crear un usuario se lo asignemos a un empleado
// del sistema --> un empleado puede o no tener usuarios

empleadosModel.hasMany(userModel, {
  foreignKey: "idEmpleado",
  sourceKey: "id",
});
userModel.belongsTo(empleadosModel, {
  foreignKey: "idEmpleado",
  targetKey: "id",
});

import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { permisosModel } from "./permisos.js";
import { userModel } from "./user.js";

export const rolesModel = sequelize.define(
  "roles",
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

// Los roles que pueden tener los usuarios del sistema
rolesModel.hasMany(userModel, {
  foreignKey: "idRol",
  sourceKey: "id",
});

userModel.belongsTo(rolesModel, {
  foreignKey: "idRol",
  targetId: "id",
});

// Los permisos que pueden tener los roles de usuario
rolesModel.hasMany(permisosModel, {
  foreignKey: "idRol",
  sourceKey: "id",
});

permisosModel.belongsTo(rolesModel, {
  foreignKey: "idRol",
  targetId: "id",
});


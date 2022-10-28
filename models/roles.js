import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
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
  },
  {
    timestamps: false,
  }
);

rolesModel.hasMany(userModel, {
  foreignKey: "idRol",
  sourceKey: "id",
});

userModel.belongsTo(rolesModel, {
  foreignKey: "idRol",
  targetId: "id",
});

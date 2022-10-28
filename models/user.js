import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { modelProducts } from "./product.js";

export const userModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);


userModel.hasMany(modelProducts, {
  foreignKey: "idUserCreateProduct",
  sourceKey: "id"
})
modelProducts.belongsTo(userModel, {
  foreignKey: "idUserCreateProduct",
  targetKey: "id"
})

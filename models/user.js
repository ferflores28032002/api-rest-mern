import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { modelProducts } from "./product.js";
import { ventasModel } from "./ventas.js";

export const userModel = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    image_id: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

// foreing key del usuario que crea productos

userModel.hasMany(modelProducts, {
  foreignKey: "idUserCreateProduct",
  sourceKey: "id",
});
modelProducts.belongsTo(userModel, {
  foreignKey: "idUserCreateProduct",
  targetKey: "id",
});


userModel.hasMany(ventasModel, {
  foreignKey: "idUserCreateVenta",
  sourceKey: "id",
});
ventasModel.belongsTo(userModel, {
  foreignKey: "idUserCreateVenta",
  targetKey: "id",
});

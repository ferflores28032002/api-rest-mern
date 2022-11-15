import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { modelProducts } from "./product.js";

export const proveedoresModel = sequelize.define(
  "proveedores",
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

// Las categorias las tienen los productos del inventario
proveedoresModel.hasMany(modelProducts, {
  foreignKey: "idProveedor",
  sourceKey: "id",
});

modelProducts.belongsTo(proveedoresModel, {
  foreignKey: "idProveedor",
  targetKey: "id",
});

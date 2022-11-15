import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";
import { modelProducts } from "./product.js";

export const categoriesModel = sequelize.define(
  "categories",
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

// Las categorias las tienen los productos del inventario
categoriesModel.hasMany(modelProducts, {
  foreignKey: "idCategories",
  sourceKey: "id",
});

modelProducts.belongsTo(categoriesModel, {
  foreignKey: "idCategories",
  targetKey: "id",
});

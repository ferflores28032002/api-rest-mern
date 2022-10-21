// Creaciones de los modelos de la base de datos mysql

import { DataTypes } from "sequelize";
import { sequelize } from "../database/conexion.js";

export const modelProducts = sequelize.define("products", {
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
  price: {
    type: DataTypes.DOUBLE,
  },
  image_id: {
   type: DataTypes.STRING
  },
  image_url: {
    type: DataTypes.STRING
  }

});

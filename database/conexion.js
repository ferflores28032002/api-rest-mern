import { Sequelize } from "sequelize";
import { DATABASE, HOST, PASS, USER } from "../env/config.js";

export const sequelize = new Sequelize(DATABASE, USER, PASS, {
  host: HOST,
  dialect: "mysql",
});

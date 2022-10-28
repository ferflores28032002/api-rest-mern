import express from "express";
import {
  addCategories,
  deleteCategories,
  getCategories,
  updateCategories,
} from "../controllers/categoriesControllers.js";
const routerCategories = express.Router();

routerCategories.get("/categories", getCategories);
routerCategories.post("/categories", addCategories);
routerCategories.delete("/categories/:id", deleteCategories);
routerCategories.put("/categories/:id", updateCategories);

export default routerCategories;

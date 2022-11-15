import express from "express";
import {
  addCategories,
  deleteCategories,
  getCategories,
  onecategoria,
  updateCategories,
} from "../controllers/categoriesControllers.js";
const routerCategories = express.Router();

routerCategories.get("/categories", getCategories);
routerCategories.post("/categories", addCategories);
routerCategories.delete("/categories/:id", deleteCategories);
routerCategories.put("/categories/:id", updateCategories);
routerCategories.get("/categoria/:id", onecategoria);

export default routerCategories;

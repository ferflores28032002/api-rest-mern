import { Router } from "express";
import {
  addPermisos,
  deletePermisos,
  getPermisos,
  searchPermisosId,
  updatePermisos,
} from "../controllers/permisosControllers.js";

const routerPermisos = Router();

routerPermisos.get("/permisos", getPermisos);
routerPermisos.get("/permisos/rol/:id", searchPermisosId);
routerPermisos.post("/permisos", addPermisos);
routerPermisos.delete("/permisos/:id", deletePermisos);
routerPermisos.put("/permisos/:id", updatePermisos);

export default routerPermisos;

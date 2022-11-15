import express from "express";
import {
  addRoles,
  deleteRoles,
  getRoles,
  oneRol,
  updateRoles,
} from "../controllers/rolesControllers.js";
const routerRoles = express.Router();

routerRoles.get("/roles", getRoles);
routerRoles.post("/roles", addRoles);
routerRoles.delete("/roles/:id", deleteRoles);
routerRoles.put("/roles/:id", updateRoles);
routerRoles.get("/rol/:id", oneRol);

export default routerRoles;

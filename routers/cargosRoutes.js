import { Router } from "express";
import {
  addCargo,
  deleteCargos,
  getCargos,
  oneCargo,
  updateCargos,
} from "../controllers/cargosControllers.js";
const routerCargo = Router();

routerCargo.get("/cargos", getCargos);
routerCargo.post("/cargos", addCargo);
routerCargo.delete("/cargos/:id", deleteCargos);
routerCargo.put("/cargos/:id", updateCargos);
routerCargo.get("/cargo/:id", oneCargo);

export default routerCargo;

import { Router } from "express";
import {
  addEmpleados,
  deleteEmpleado,
  getEmpleados,
  searchEmpleado,
  updateEmpleados,
} from "../controllers/empleadosControllers.js";

const routerEmpleados = Router();

routerEmpleados.get("/empleados", getEmpleados);
routerEmpleados.post("/empleados", addEmpleados);
routerEmpleados.delete("/empleados/:id", deleteEmpleado);
routerEmpleados.put("/empleados/:id", updateEmpleados);
routerEmpleados.get("/search/empleados/:id", searchEmpleado);

export default routerEmpleados;

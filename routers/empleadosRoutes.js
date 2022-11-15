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
routerEmpleados.put("/empleado/:id", updateEmpleados);
routerEmpleados.get("/empleado/:id", searchEmpleado);

export default routerEmpleados;

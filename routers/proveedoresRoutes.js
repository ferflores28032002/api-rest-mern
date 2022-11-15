import { Router } from "express";
import {
  addproveedores,
  deleteproveedores,
  getproveedores,
  updateproveedores,
} from "../controllers/proveedoresControllers.js";
const routerProveedores = Router();

routerProveedores.get("/proveedores", getproveedores);
routerProveedores.post("/proveedores", addproveedores);
routerProveedores.delete("/proveedores/:id", deleteproveedores);
routerProveedores.put("/proveedores/:id", updateproveedores);

export default routerProveedores;

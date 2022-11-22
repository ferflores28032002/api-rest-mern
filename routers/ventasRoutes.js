import { Router } from "express";
import { addVentas, deleteVentas, loadVentas } from "../controllers/ventasController.js";



const routerVentas = Router();




routerVentas.get("/ventas", loadVentas)
routerVentas.post("/ventas", addVentas)
routerVentas.delete("/ventas/:id", deleteVentas)




export default routerVentas;
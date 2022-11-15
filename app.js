import express from "express";
import { DATABASE, PORT } from "./env/config.js";
import cors from "cors";
import { sequelize } from "./database/conexion.js";

import router from "./routers/productRoutes.js";
import routerUsers from "./routers/usersRoutes.js";
import routerCategories from "./routers/categoriesRoutes.js";
import routerRoles from "./routers/rolesRoutes.js";
import routerCargo from "./routers/cargosRoutes.js";
import routerEmpleados from "./routers/empleadosRoutes.js";
import routerPermisos from "./routers/permisosRoutes.js";
import routerProveedores from "./routers/proveedoresRoutes.js";

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb"}));
app.use(cors());

// Usamos las rutas con la union de los modelos y los controladores
app.use(router);
app.use(routerUsers);
app.use(routerCategories);
app.use(routerRoles);
app.use(routerCargo);
app.use(routerEmpleados);
app.use(routerPermisos);
app.use(routerProveedores);

// verificamos que la conexion sea exitosa ala base de datos mysql

async function main() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log(`Conectado exitosamente ala base de datos --> ${DATABASE}`);
  } catch (error) {
    console.log(`Error al conectar con la base de datos --> ${DATABASE}`);
  }
}

main();

app.listen(PORT, (req, res) => {
  console.log(`Servidor corriendo en el puerto: localhost:${PORT}`);
});

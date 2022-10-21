import express from "express";
import { DATABASE, PORT } from "./env/config.js";
import cors from "cors";
import { sequelize } from "./database/conexion.js";
import router from "./routers/productRoutes.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Usamos las rutas con la union de los modelos y los controladores
app.use(router);
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

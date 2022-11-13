import express from "express";
import {
  addUsersControllers,
  deleteUsers,
  getUserControllers,
  loginUsersControllers,
  revalidarToken,
  searchUserForId,
  updatePassword,
  updateUsers,
} from "../controllers/usersControllers.js";

// Configuracion de express-fileupload para cargar imagenes
import fileUpload from "express-fileupload";
import { validarJWT } from "../middlewares/validar-jwt.js";

const routerUsers = express.Router();

routerUsers.get("/users", getUserControllers);

routerUsers.post("/users", addUsersControllers);

routerUsers.post("/login/user", loginUsersControllers);

routerUsers.delete("/users/:id", deleteUsers);

routerUsers.put(
  "/users/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./imagenes",
  }),
  updateUsers
);

routerUsers.put("/update/password/user/:id", updatePassword);
routerUsers.get("/search/user/:id", searchUserForId);
routerUsers.get("/renew/token", validarJWT, revalidarToken);

export default routerUsers;

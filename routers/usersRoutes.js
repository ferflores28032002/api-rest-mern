import express from "express";
import {
  addUsersControllers,
  deleteUsers,
  emailPassword,
  getUserControllers,
  loginUsersControllers,
  restablecerPassword,
  revalidarToken,
  searchUserForId,
  updatePassword,
  updateUsers,
} from "../controllers/usersControllers.js";


import { validarJWT } from "../middlewares/validar-jwt.js";

const routerUsers = express.Router();

routerUsers.get("/users", getUserControllers);

routerUsers.post("/users", addUsersControllers);

routerUsers.post("/login/user", loginUsersControllers);

routerUsers.delete("/users/:id", deleteUsers);

routerUsers.put("/users/:id", updateUsers);

routerUsers.put("/update/password/user/:id", updatePassword);
routerUsers.get("/user/:id", searchUserForId);
routerUsers.get("/renew/token", validarJWT, revalidarToken);


// Rutas para cambiar contraseña

routerUsers.post("/email/password", emailPassword)
routerUsers.put("/restablecer/password/:id", restablecerPassword)

export default routerUsers;

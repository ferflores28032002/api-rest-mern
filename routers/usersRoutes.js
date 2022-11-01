import express from "express";
import {
  addUsersControllers,
  deleteUsers,
  getUserControllers,
  loginUsersControllers,
  updatePassword,
  updateUsers,
} from "../controllers/usersControllers.js";

// Configuracion de express-fileupload para cargar imagenes
import fileUpload from "express-fileupload";

const routerUsers = express.Router();

routerUsers.get("/users", getUserControllers);

routerUsers.post(
  "/users",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./imagenes",
  }),
  addUsersControllers
);

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

export default routerUsers;

import express from "express";
import {
  addUsersControllers,
  getUserControllers,
} from "../controllers/usersControllers.js";

const routerUsers = express.Router();

routerUsers.get("/users", getUserControllers);
routerUsers.post("/users", addUsersControllers);

export default routerUsers;

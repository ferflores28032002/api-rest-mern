import jwt from "jsonwebtoken";
import { palabra_secreta } from "../env/config.js";

export const generarJWT = (name, email, id, idEmpleado) => {
  return new Promise((resolve, reject) => {
    const payload = { name, email, id, idEmpleado };

    jwt.sign(payload,palabra_secreta,{
        expiresIn: "7d",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

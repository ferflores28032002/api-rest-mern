import { rolesModel } from "../models/roles.js";
import { userModel } from "../models/user.js";

// Mostrar todos los usuarios del sistema
export const getUserControllers = async (req, res) => {
  const page = Number(req.query.page) || 0;
  let size = 10;

  let options = {
    limit: +size,
    offset: +page * +size,
  };

  try {
    const { count } = await userModel.findAndCountAll(options);
    const usuarios = await userModel.findAll({
      include: {
        model: rolesModel,
        attributes: ["name"],
      },
    });

    res.json({
      total_register: count,
      page,
      users: usuarios,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Ingresar usuarios al sistema
export const addUsersControllers = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.create({
      email,
      password,
    });

    res.json({
      res: "Usuario agregado correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

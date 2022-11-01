// Controlador para las categorias de los productos

import { rolesModel } from "../models/roles.js";

export const getRoles = async (req, res) => {
  const page = Number(req.query.page) || 0;
  let size = 10;

  let options = {
    limit: +size,
    offset: +page * +size,
  };
  try {
    const { count, rows } = await rolesModel.findAndCountAll(options);

    res.json({
      cantidad_roles: count,
      page,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear nuevas roles

export const addRoles = async (req, res) => {
  const { name } = req.body;

  try {
    // Buscamos el rol para ver si ya existe en el sistema
    const buscar_rol = await rolesModel.findOne({
      where: {
        name,
      },
    });
    if (buscar_rol) {
      return res.json({
        msg: "¡El rol ya existe!",
      });
    }
    const roles = await rolesModel.create({
      name,
    });

    res.json({
      msg: "¡Rol creado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elminar roles

export const deleteRoles = async (req, res) => {
  const { id } = req.params;

  try {
    const roles = await rolesModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Rol eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar roles de los productos

export const updateRoles = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const update = await rolesModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
    });

    update.save();

    res.json({
      msg: "¡Rol actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

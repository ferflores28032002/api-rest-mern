// Controlador para las categorias de los productos

import { rolesModel } from "../models/roles.js";

export const getRoles = async (req, res) => {
  try {
    const { count, rows } = await rolesModel.findAndCountAll();

    res.json({
      cantidad_roles: count,
      roles: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear nuevas roles

export const addRoles = async (req, res) => {
  const { name } = req.body;

  try {
    const roles = await rolesModel.create({
      name,
    });

    res.json({
      res: "¡Rol creado correctamente!",
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
      res: "¡Rol eliminado correctamente!",
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
      res: "¡Rol actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
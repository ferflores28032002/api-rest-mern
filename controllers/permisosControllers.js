import { permisosModel } from "../models/permisos.js";

// Mostrar todos los permisos
export const getPermisos = async (req, res) => {
  try {
    const permisos = await permisosModel.findAll();

    res.json({
      permisos,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Mostrar todos los permisos de un rol

export const searchPermisosId = async (req, res) => {
  const { id } = req.params;

  try {
    const permisos = await permisosModel.findAll({
      where: {
        idRol: id,
      },
    });

    if (permisos.length === 0) {
      return res.json({
        msg: "¡El rol no tiene permisos!",
      });
    }

    res.json({
      permisos,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Añadir permisos a roles

export const addPermisos = async (req, res) => {
  const { name, description, idRol } = req.body;

  try {
    // Buscamos el rol para ver si ya existe en el sistema
    const buscar_permiso = await permisosModel.findOne({
      where: {
        name,
      },
    });
    if (buscar_permiso) {
      return res.json({
        msg: "¡El permiso ya existe!",
      });
    }
    const permisos = await permisosModel.create({
      name,
      description,
      idRol,
    });

    res.json({
      msg: "¡Permiso creado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elminar permisos

export const deletePermisos = async (req, res) => {
  const { id } = req.params;

  try {
    const permisos = await permisosModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Permiso eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar roles de los productos

export const updatePermisos = async (req, res) => {
  const { id } = req.params;
  const { name, description, idRol } = req.body;

  try {
    const update = await permisosModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
      description,
      idRol,
    });

    update.save();

    res.json({
      msg: "¡Permiso actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

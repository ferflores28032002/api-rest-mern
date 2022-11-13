// Controlador para los cargos de los empleados del sistema

import { cargosModel } from "../models/cargos.js";

export const getCargos = async (req, res) => {
  // const page = Number(req.query.page) || 0;
  // let size = 10;

  // let options = {
  //   limit: +size,
  //   offset: +page * +size,
  // };

  try {
    const { count, rows } = await cargosModel.findAndCountAll();

    res.json({
      cantidad_cargos: count,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear nuevas cargos

export const addCargo = async (req, res) => {
  const { name } = req.body;

  try {
    // Buscamos el cargo para ver si ya existe en el sistema
    const buscar_cargo = await cargosModel.findOne({
      where: {
        name,
      },
    });

    if (buscar_cargo) {
      return res.json({
        msg: "¡El cargo ya existe!",
      });
    }

    const cargo = await cargosModel.create({
      name,
    });

    res.json({
      msg: "¡Cargo creado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elminar cargos

export const deleteCargos = async (req, res) => {
  const { id } = req.params;

  try {
    const cargo = await cargosModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Cargo eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar roles de los productos

export const updateCargos = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const update = await cargosModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
    });

    update.save();

    res.json({
      msg: "¡Cargo actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// Controlador para los cargos de los empleados del sistema

import { cargosModel } from "../models/cargos.js";
import { empleadosModel } from "../models/empleados.js";

export const getEmpleados = async (req, res) => {
  const page = Number(req.query.page) || 0;
  let size = 10;

  let options = {
    limit: +size,
    offset: +page * +size,
  };

  try {
    const { count } = await empleadosModel.findAndCountAll(options);
    const employes = await empleadosModel.findAll({
      include: {
        model: cargosModel,
      },
    });

    res.json({
      cantidad_empleados: count,
      page,
      data: employes,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear nuevo empleado
export const addEmpleados = async (req, res) => {
  const { names, surnames, age, telephone, salary, direction, sex, idCargo } =
    req.body;

  try {
    // Buscamos el cargo para ver si ya existe en el sistema
    const buscar_empleado = await empleadosModel.findOne({
      where: {
        names,
        surnames,
      },
    });

    if (buscar_empleado) {
      return res.json({
        msg: "¡El Empleado ya existe!",
      });
    }

    const empleado = await empleadosModel.create({
      names,
      surnames,
      age,
      telephone,
      salary,
      direction,
      sex,
      idCargo,
    });

    res.json({
      msg: "Empleado creado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elminar empleado

export const deleteEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const empleado = await empleadosModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Empleado eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar empleado

export const updateEmpleados = async (req, res) => {
  const { id } = req.params;
  const { names, surnames, age, telephone, salary, direction, sex, idCargo } =
    req.body;

  try {
    const update = await empleadosModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      names,
      surnames,
      age,
      telephone,
      salary,
      direction,
      sex,
      idCargo,
    });

    update.save();

    res.json({
      msg: "¡Empleado actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Buscar un empleado por id

export const searchEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const empleado = await empleadosModel.findOne({
      where: {
        id,
      },
    });

    if (!empleado) {
      return res.json({
        msg: "¡El empleado no existe!",
      });
    }

    res.json({
      msg: "¡Empleado encontrado!",
      empleado,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

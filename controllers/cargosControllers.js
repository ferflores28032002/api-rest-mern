// Controlador para los cargos de los empleados del sistema

import { cargosModel } from "../models/cargos.js";

export const getCargos = async (req, res) => {

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
  const { name,description } = req.body;

  try {
    // Buscamos el cargo para ver si ya existe en el sistema
    const buscar_cargo = await cargosModel.findOne({
      where: {
        name,
      },
    });

    if (buscar_cargo) {
      return res.status(500).json({
        msg: "¡El cargo ya existe!",
      });
    }

    const cargo = await cargosModel.create({
      name,
      description
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
  const { name,description } = req.body;

  try {
     // Buscamos el cargo para ver si ya existe en el sistema
     const buscar_cargo = await cargosModel.findOne({
      where: {
        name,

      },
    });

    if (buscar_cargo) {
      return res.status(500).json({
        msg: "¡El cargo ya existe!",
      });
    }
    const update = await cargosModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
      description
    });

    update.save();

    res.json({
      msg: "¡Cargo actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const oneCargo = async (req, res) => {

  const { id } = req.params

  try {
    
    const cargo = await cargosModel.findOne({
      where: {
        id
      }
    })


    if(!cargo){
      res.json({
        msg: "El cargo no existe"
      })
    }

    res.json({
      data: cargo
    })

  } catch (error) {
    console.log(error)
  }

}


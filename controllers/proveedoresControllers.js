// Controlador para las categorias de los productos

import { proveedoresModel } from "../models/proveedores.js";

export const getproveedores = async (req, res) => {

  try {
    const { count, rows } = await proveedoresModel.findAndCountAll();

    res.json({
      cantidad_proveedores: count,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear nuevas categorias

export const addproveedores = async (req, res) => {
  const { name } = req.body;

  try {
    // Buscamos la categoria aver si existe
    const buscar_cate = await proveedoresModel.findOne({
      where: {
        name,
      },
    });

    if (buscar_cate) {
      return res.json({
        msg: "¡El proveedor ya existe!",
      });
    }
    const categoria = await proveedoresModel.create({
      name,
    });

    res.json({
      msg: "¡Categoria creada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elminar categorias

export const deleteproveedores = async (req, res) => {
  const { id } = req.params;

  try {
    const cateDelete = await proveedoresModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Proveedor eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar categorias de los productos

export const updateproveedores = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const update = await proveedoresModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
    });

    update.save();

    res.json({
      msg: "Proveedor actualizada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

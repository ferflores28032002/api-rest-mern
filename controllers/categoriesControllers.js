// Controlador para las categorias de los productos

import { categoriesModel } from "../models/categories.js";

export const getCategories = async (req, res) => {
  try {
    const { count, rows } = await categoriesModel.findAndCountAll();

    res.json({
      cantidad_categories: count,
      categorias: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear nuevas categorias

export const addCategories = async (req, res) => {
  const { name } = req.body;

  try {
    const categoria = await categoriesModel.create({
      name,
    });

    res.json({
      res: "¡Categoria creada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Elminar categorias

export const deleteCategories = async (req, res) => {
  const { id } = req.params;

  try {
    const cateDelete = await categoriesModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      res: "¡Categoria eliminada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar categorias de los productos

export const updateCategories = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const update = await categoriesModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
    });

    update.save();

    res.json({
      res: "¡Categoria actualizada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

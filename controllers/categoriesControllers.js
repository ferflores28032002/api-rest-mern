// Controlador para las categorias de los productos

import { categoriesModel } from "../models/categories.js";

export const getCategories = async (req, res) => {
  // const page = Number(req.query.page) || 0;
  // let size = 10;

  // let options = {
  //   limit: +size,
  //   offset: +page * +size,
  // };
  try {
    const { count, rows } = await categoriesModel.findAndCountAll();

    res.json({
      cantidad_categories: count,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// crear nuevas categorias

export const addCategories = async (req, res) => {
  const { name } = req.body;

  try {
    // Buscamos la categoria aver si existe
    const buscar_cate = await categoriesModel.findOne({
      where: {
        name,
      },
    });

    if (buscar_cate) {
      return res.json({
        msg: "¡La categoria ya existe!",
      });
    }
    const categoria = await categoriesModel.create({
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

export const deleteCategories = async (req, res) => {
  const { id } = req.params;

  try {
    const cateDelete = await categoriesModel.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Categoria eliminada correctamente!",
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
      msg: "¡Categoria actualizada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controlador para las categorias de los productos

import { categoriesModel } from "../models/categories.js";

export const getCategories = async (req, res) => {
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
  const { name, description } = req.body;

  try {
    // Buscamos la categoria aver si existe
    const buscar_cate = await categoriesModel.findOne({
      where: {
        name,
      },
    });

    if (buscar_cate) {
      return res.status(500).json({
        msg: "¡La categoria ya existe!",
      });
    }
    const categoria = await categoriesModel.create({
      name,
      description,
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
  const { name, description } = req.body;

  try {
    // Buscamos la categoria aver si existe
    const buscar_cate = await categoriesModel.findOne({
      where: {
        name,
      },
    });

    if (buscar_cate) {
      return res.status(500).json({
        msg: "¡La categoria ya existe!",
      });
    }
    const update = await categoriesModel.findOne({
      where: {
        id,
      },
    });

    update.set({
      name,
      description,
    });

    update.save();

    res.json({
      msg: "¡Categoria actualizada correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const onecategoria = async (req, res) => {
  const { id } = req.params;

  try {
    const categoria = await categoriesModel.findOne({
      where: {
        id,
      },
    });

    if (!categoria) {
      res.json({
        msg: "la categoria no existe",
      });
    }

    res.json({
      data: categoria,
    });
  } catch (error) {
    console.log(error);
  }
};

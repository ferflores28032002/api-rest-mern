import { modelProducts } from "../models/product.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

// Modulo para eliminar las imagenes y usar funciones asyncronas
import fs from "fs-extra";
import { categoriesModel } from "../models/categories.js";
import { userModel } from "../models/user.js";
import { rolesModel } from "../models/roles.js";

// Mostrar todos los productos
export const productsControllers = async (req, res) => {

  try {
    const { count } = await modelProducts.findAndCountAll();
    const productos = await modelProducts.findAll({
      include: [
        {
          model: categoriesModel,
          attributes: ["name"],
        },
        {
          model: userModel,
          attributes: ["email", "name", "image_url"],
        },
      ],
    });

    res.json({
      total_register: count,
      data: productos,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Agregar nuevos productos ala tabla products

export const addProductsControllers = async (req, res) => {
  const { name, description, price, idCategories, idUserCreateProduct, stock, image } =
    req.body;

  try {

      const results = await uploadImage(image);
      const { public_id, secure_url } = results;

      const addProducts = await modelProducts.create({
        name,
        description,
        stock,
        price,
        image_id: public_id,
        image_url: secure_url,
        idCategories,
        idUserCreateProduct,
      });


    res.status(200).json({
      msg: "¡Producto añadido correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un products por id

export const deleteProductsControllers = async (req, res) => {
  const { id } = req.params;

  try {
    const buscar = await modelProducts.findOne({
      where: {
        id,
      },
    });

    await deleteImage(buscar.image_id);

    const deleteProducts = await modelProducts.destroy({
      where: {
        id,
      },
    });

    res.json({
      msg: "¡Producto Eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar un producto por id

export const updateProductControllers = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, idCategories, idUserCreateProduct, image } =
    req.body;

  try {
    const product = await modelProducts.findOne({
      where: {
        id,
      },
    });

    product.set({
      name,
      stock,
      description,
      price,
      idCategories,
      idUserCreateProduct,
    });

    if (image) {
      await deleteImage(product.image_id);

      const results = await uploadImage(image);
      const { public_id, secure_url } = results;

      product.set({
        image_id: public_id,
        image_url: secure_url,
      });
    }
    await product.save();

    res.json({
      msg: "¡Producto Actualizado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Buscar un producto por id

export const searchProductId = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await modelProducts.findOne({
      where: {
        id,
      },
      include: [
        {
          model: userModel,
          
        },{
          model: categoriesModel
        }
      ]
    });

    if (!product) {
      return res.json({
        msg: "¡El producto no existe!",
      });
    }

    res.json({
      msg: "¡Producto encontrado!",
      data: product,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// buscar productos por categoriad

export const searchProductCategories = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await modelProducts.findAll({
      where: {
        idCategories: id,
      },
    });


    console.log(product)

    if (product.length===0) {
      return res.json({
        msg: "¡El producto con esa categoria no existe!",
      });
    }
    res.json({
      msg: "¡Productos encontrado!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Buscar productos por names

export const searchProductNames = async (req, res) => {
  const { name } = req.params;

  try {
    const product = await modelProducts.findAll({
      include: {
        model: categoriesModel
      }
    });

    
  const resultado = product.filter((elemento) => elemento.name.toLowerCase().includes(name.toLocaleLowerCase()));


    if (resultado.length===0) {
      return res.json({
        msg: "¡No hay productos con ese nombre!",
      });
    }
    res.json({
      msg: "¡Producto encontrado!",
      data: resultado,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};



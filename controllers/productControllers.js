// Controladores de cada tabla de la base de datos mysql
// Unimos el controlador con el modelo de la tabla
// Ejemplo: modelProducts --> productsControllers

import { modelProducts } from "../models/product.js";
import { deleteImage, uploadImage } from "../utils/cloudinary.js";

// Modulo para eliminar las imagenes y usar funciones asyncronas
import fs from "fs-extra";

// Mostrar todos los productos

export const productsControllers = async (req, res) => {
  try {
    const products = await modelProducts.findAll();

    if (products.length === 0) {
      res.json("¡No hay Registros en la tabla!");
    }

    res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Agregar nuevos productos ala tabla products

export const addProductsControllers = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    if (req.files?.image) {
      const results = await uploadImage(req.files.image.tempFilePath);
      const { public_id, secure_url } = results;

      const addProducts = await modelProducts.create({
        name,
        description,
        price,
        image_id: public_id,
        image_url: secure_url,
      });
      await fs.unlink(req.files.image.tempFilePath);
    }

    res.json({
      res: "¡Producto añadido correctamente!",
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
      res: "¡Producto con el id " + id + " Eliminado correctamente!",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Modificar un producto por id

export const updateProductControllers = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await modelProducts.findOne({
      where: {
        id,
      },
    });

    product.set({
      name,
      description,
      price,
    });

    if (req.files?.image) {
      await deleteImage(product.image_id);

      const results = await uploadImage(req.files.image.tempFilePath);
      const { public_id, secure_url } = results;

      product.set({
        image_id: public_id,
        image_url: secure_url,
      });
      await fs.unlink(req.files.image.tempFilePath);
    }
    await product.save();

    res.json("actualizado");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

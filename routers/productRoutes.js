// Configuaciones de los enpoint de la api rest

import express from "express";
import {
  addProductsControllers,
  deleteProductsControllers,
  productsControllers,
  searchProductCategories,
  searchProductId,
  updateProductControllers,
} from "../controllers/productControllers.js";

// Configuracion de express-fileupload para cargar imagenes
import fileUpload from "express-fileupload";
const router = express.Router();

router.get("/product/", productsControllers);

router.post(
  "/product/",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./imagenes",
  }),
  addProductsControllers
);

router.delete("/product/:id", deleteProductsControllers);

router.put(
  "/product/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./imagenes",
  }),
  updateProductControllers
);

router.get("/product/:id", searchProductId);
router.get("/product/:id/categories", searchProductCategories);

export default router;

// Configuaciones de los enpoint de la api rest

import express from "express";
import {
  addProductsControllers,
  deleteProductsControllers,
  productsControllers,
  searchProductCategories,
  searchProductId,
  searchProductNames,
  updateProductControllers,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/product/", productsControllers);

router.post("/product/", addProductsControllers);

router.delete("/product/:id", deleteProductsControllers);

router.put("/product/:id",updateProductControllers);

router.get("/product/:id", searchProductId);
router.get("/product/:id/categories", searchProductCategories);
router.get("/product/:name/names", searchProductNames);

export default router;

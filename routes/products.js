import express from "express";

import {
  createProductController,
  deleteProductController,
  getAllProductController,
  getSingleProductController,
  updateProductController,
} from "../controllers/productController.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//Hotel routes here

//Create
router.post("/", verifyToken, verifyAdmin, createProductController);

//Update
router.put("/:id", verifyToken, verifyAdmin, updateProductController);

//Delete
router.delete("/:id", verifyToken, verifyAdmin, deleteProductController);

//Get Single

router.get("/:id", verifyToken, verifyAdmin, getSingleProductController);

//Get All
router.get("/", verifyToken, getAllProductController);

export default router;

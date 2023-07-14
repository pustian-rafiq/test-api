import { validateMongoDbID } from "../middlewares/validateMongodbID.js";
import Product from "../models/product.js";
import { createError } from "../utils/error.js";

//Create Product controller
export const createProductController = async (req, res, next) => {
  const newProduct = new Product(req.body);
  const product = await Product.findOne({ name: req.body.name });
  if (!product) {
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json({
        message: "Product saved successfully",
        savedProduct,
      });
    } catch (err) {
      next(err); //This error goes to next middleware in the index.js.
    }
  } else {
    return next(createError(400, "This product already exists"));
  }
};

//Update Product controller
export const updateProductController = async (req, res, next) => {
  const newProduct = new Product(req.body);
  //   Check if product already exists or not
  //   validateMongoDbID(req.params.id);
  if (validateMongoDbID(req.params.id)) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        message: "Product updated successfully",
        updatedProduct,
      });
    } catch (err) {
      next(err); //This error goes to next middleware in the index.js.
    }
  } else {
    return next(createError(400, "This is not a valid ID"));
  }
};
//Delete Product controller
export const deleteProductController = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted successfully");
  } catch (err) {
    next(err);
  }
};

//Get single Product controller
export const getSingleProductController = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

//Get all Product controller
export const getAllProductController = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

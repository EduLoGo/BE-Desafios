import { Router } from "express";
import { MongoProducts } from "../dao/db/mongoProducts.js";

const productManager = new MongoProducts();

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const resProducts = await productManager.productAll(limit);
    if (!limit) {
      res.status(200).json({
        status: `Success`,
        message: "All products",
        payload: resProducts,
      });
    } else {
      res.status(200).json({
        status: `Success`,
        message: `Showing ${limit} products`,
        payload: resProducts,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: `Error`,
      message: "An unexpected error has occurred! Please, try again later.",
      payload: {},
    });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productFound = await productManager.productById(pid);
    if (!productFound) {
      res.status(404).json({
        // NO arroja error cuando el ID no existe
        status: `Error`,
        message: `Product ID ${pid} not found:` + error.message,
        payload: {},
      });
    } else {
      res.status(200).json({
        status: `Success`,
        message: `Product ID ${pid} found!`,
        payload: productFound,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: `Error`,
      message: `An error has occurred: ` + error.message,
      payload: {},
    });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productManager.productAdd(newProduct);
    res.status(201).json({
      status: `Success`,
      message: `Product added successfully`,
      payload: addedProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: `Error`,
      message: `An error has occurred: ` + error.message,
      payload: {},
    });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const newInfo = req.body;
    const updatedProduct = await productManager.productUpdate(pid, newInfo);
    if (!updatedProduct) {
      res.status(404).json({
        status: `Error`,
        message: `Product ID ${pid} not found!`,
        payload: {},
      });
    } else {
      res.status(200).json({
        status: `Success`,
        message: `Product ID ${pid} updated successfully`,
        payload: updatedProduct,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: `Error`,
      message: `An error has occurred: ` + error.message,
      payload: {},
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.productDelete(pid);
    if (!deletedProduct) {
      res.status(404).json({
        status: `Error`,
        message: `Product ID ${pid} not found!`,
        payload: {},
      });
    } else {
      res.status(200).json({
        status: `Success`,
        message: `Product ID ${pid} deleted successfully`,
        payload: deletedProduct,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: `Error`,
      message: `An error has occurred: ` + error.message,
      payload: {},
    });
  }
});

export default productsRouter;

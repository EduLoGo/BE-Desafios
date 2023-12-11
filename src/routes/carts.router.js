import { Router } from "express";
import mongoose from "mongoose";
import { MongoCarts } from "../dao/db/mongoCarts.js";
import { MongoProducts } from "../dao/db/mongoProducts.js";

const cartsManager = new MongoCarts();
const productsManager = new MongoProducts();

export const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartsManager.createCart();
    res.status(201).json({
      status: "Success",
      message: "Cart created successfully",
      payload: newCart,
    });
  } catch (error) {
    res.status(400).json({
      status: "Error",
      message: "The cart could not be created: " + error.message,
      payload: {},
    });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res.status(400).json({
      status: "Error",
      message: `ID ${cid} not valid!`,
      payload: {},
    });
  }

  try {
    const cart = await cartsManager.cartById(cid);
    if (cart) {
      res.status(200).json({
        status: "Success",
        message: `Cart ${cid} found successfully`,
        payload: cart,
      });
    } else {
      res.status(404).json({
        status: "Error",
        message: `Cart ID ${cid} not found`,
        payload: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An unexpected error has occurred: " + error.message,
      payload: {},
    });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await cartsManager.cartById(cid);
    if (!cart) {
      res.status(404).json({
        status: "Error",
        message: `Cart ID ${cid} not found`,
        payload: {},
      });
    } else {
      const productExist = await productsManager.productById(pid);
      if (productExist.length !== 0) {
        const productIndex = cart.products.findIndex(
          (product) => product._id.toString() === pid
        );
        if (productIndex === -1) {
          const newProduct = { _id: productExist[0]._id, quantity: 1 };
          cart.products.push(newProduct);
          const updateCart = await cartsManager.cartUpdate(cid, cart);
          res.status(201).json({
            status: "Success",
            message: "Product added successfully",
            payload: updateCart,
          });
        } else {
          cart.products[productIndex].quantity += 1;
          const funciona = await cartsManager.cartUpdate(cid, cart);
          res.status(202).json({
            status: "Success",
            message: "Existing product, quantity was increased",
            payload: funciona,
          });
        }
      } else {
        res.status(404).json({
          status: "Error",
          message: `Product ID ${pid} not found`,
          payload: {},
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
      payload: {},
    });
  }
});

export default cartsRouter;

import { Router } from "express";
import mongoose from "mongoose";
import { MongoCarts } from "../dao/db/mongoCarts.js";
import { MongoProducts } from "../dao/db/mongoProducts.js";

const cartsManager = new MongoCarts();
const productsManager = new MongoProducts();

export const cartsRouter = Router();

cartsRouter.post("/", async (req, res) => {
  try {
    const products = [];
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

/* cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const productsDB = await productManager.loadData();
    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
      res.status(404).json({
        status: "Error",
        message: `Cart ID ${cartId} not found`,
        payload: {},
      });
    } else {
      const productExist = productsDB.some((elem) => elem.id === productId);
      if (productExist) {
        const productIndex = cart.products.findIndex(
          (elem) => elem.idProduct === productId
        );
        if (productIndex === -1) {
          const newProduct = { idProduct: productId, quantity: 1 };
          cart.products.push(newProduct);
          await cartManager.updateCart(cartId, cart);
          res.status(201).json({
            status: "Success",
            message: "Product added successfully",
            payload: cart,
          });
        } else {
          cart.products[productIndex].quantity += 1;
          await cartManager.updateCart(cartId, cart);
          res.status(202).json({
            status: "Success",
            message: "Existing product, quantity was increased",
            payload: cart,
          });
        }
      } else {
        res.status(404).json({
          status: "Error",
          message: `Product ID ${productId} not found`,
          payload: {},
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: `An unexpected error has occurred`,
      payload: {},
    });
  }
}); */

export default cartsRouter;

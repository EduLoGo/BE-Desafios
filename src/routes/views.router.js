import { Router } from "express";
import { socketServer } from "../app.js";
import ProductManager from "../productManager.js";

const productManager = new ProductManager("./src/productsDB.json");

const viewsRouters = Router();

viewsRouters.get("/", async (req, res) => {
  try {
    const dataDB = await productManager.getProducts();
    res.render("home", { dataDB });
  } catch (error) {
    throw new Error(error);
  }
});

viewsRouters.get("/realtimeproducts", async (req, res) => {
  try {
    const dataDB = await productManager.getProducts();
    res.render("realTimeProducts", { dataDB });
  } catch (error) {
    throw new Error(error);
  }
});

viewsRouters.post("/realtimeproducts", async (req, res) => {
  try {
    const newProduct = req.body;
    const productAdded = await productManager.addProduct(newProduct);
    socketServer.emit("products", productAdded);
  } catch (error) {
    throw new Error(error.message);
  }
});

export default viewsRouters;

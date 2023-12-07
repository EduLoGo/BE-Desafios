import { Router } from "express";
import { socketServer } from "../app.js";
import { MongoProducts } from "../dao/db/mongoProducts.js";

const productManager = new MongoProducts();

const viewsRouters = Router();

viewsRouters.get("/", async (req, res) => {
  try {
    const dataDB = await productManager.productAll();
    res.render("home", { dataDB });
  } catch (error) {
    throw new Error(error.message);
  }
});

viewsRouters.get("/realtimeproducts", async (req, res) => {
  try {
    const dataDB = await productManager.productAll();
    res.render("realTimeProducts", { dataDB });
  } catch (error) {
    throw new Error(error.message);
  }
});

viewsRouters.post("/realtimeproducts", async (req, res) => {
  try {
    const newProduct = req.body;
    const productAdded = await productManager.productAdd(newProduct);
    socketServer.emit("products", productAdded);
  } catch (error) {
    throw new Error(error.message);
  }
});

export default viewsRouters;

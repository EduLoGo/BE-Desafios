import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager("./src/productsDB.json");

app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const allProducts = await productManager.getProducts();
    if (!limit) {
      res.send({
        status: `Success`,
        payload: allProducts,
      });
    } else {
      const productsLimit = allProducts.slice(0, limit);
      res.send({
        status: `Success: Showing ${limit} products`,
        payload: productsLimit,
      });
    }
  } catch (error) {
    res.send({
      status: `Error`,
      message: error.message,
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const productFound = await productManager.getProductByID(id);
    if (!productFound) {
      res.send({
        status: `Error`,
        message: `Product ID ${id} not found!`,
      });
    } else {
      res.send({
        status: `Success`,
        payload: productFound,
      });
    }
  } catch {
    res.send({
      status: `Error`,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en el puerto ${PORT} - Link: http://localhost:${PORT}`
  );
});

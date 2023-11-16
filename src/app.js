import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouters from "./routes/views.router.js";

const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en el puerto ${PORT} - Link: http://localhost:${PORT}`
  );
});
export const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts/", cartsRouter);
app.use("/", viewsRouters);

socketServer.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado: ${socket.id}`);
});

app.get("/*", (req, res) => {
  res.status(404).json({
    status: "Error 404",
    error: "Page not found",
    payload: {},
  });
});

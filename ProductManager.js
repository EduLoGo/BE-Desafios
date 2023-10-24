const fs = require("fs");

class ProductManager {
  id = 0;
  constructor(path) {
    this.path = path;
  }
  // Cargar Archivo
  loadData() {
    try {
      return JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } catch (error) {
      return [];
    }
  }
  // Guardar en Archivo
  saveData(data) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(data));
    } catch (error) {
      return console.log(`Couldn't save data`);
    }
  }
  // Agregar Producto
  addProduct(newProduct) {
    const dataDB = this.loadData();
    let checkCode = dataDB.some((elem) => elem.code === newProduct.code);
    if (checkCode) {
      return console.log(`Code already exist`);
    } else if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.thumbnail ||
      !newProduct.code ||
      !newProduct.stock
    ) {
      return console.log(`Missing data`);
    } else {
      if (dataDB.length === 0) {
        this.id = 1;
      } else {
        this.id = dataDB[dataDB.length - 1].id + 1;
      }
      let productUpdated = { id: this.id, ...newProduct };
      this.id++;
      dataDB.push(productUpdated);
      this.saveData(dataDB);
      return console.log(`Product added successfully`);
    }
  }
  // Obtener todos los Productos
  getProducts() {
    const dataDB = this.loadData();
    return console.log(dataDB);
  }
  // Obtener Producto por ID
  getProductByID(id) {
    const dataDB = this.loadData();
    let existProduct = dataDB.find((elem) => elem.id === id);
    if (existProduct) {
      return console.log(existProduct);
    } else {
      return console.log(`Product ID ${id} not found!`);
    }
  }
  // Actualizar Producto
  updateProduct(id, newInfo) {
    const dataDB = this.loadData();
    let index = dataDB.findIndex((elem) => elem.id === id);
    if (index !== -1) {
      dataDB[index] = { ...dataDB[index], ...newInfo };
      this.saveData(dataDB);
      return console.log(`Product updated successfully`);
    } else {
      return console.log(`Product ID ${id} not found!`);
    }
  }
  // Eliminar Producto
  deleteProduct(id) {
    const dataDB = this.loadData();
    let index = dataDB.findIndex((elem) => elem.id === id);
    if (index !== -1) {
      dataDB.splice(index, 1);
      this.saveData(dataDB);
      return console.log(`Product deleted successfully`);
    } else {
      return console.log(`Product ID ${id} not found!`);
    }
  }
}

const productA = {
  title: "Producto Prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};
const productB = {
  title: "Producto Prueba 2",
  description: "Este es un producto prueba",
  price: 300,
  thumbnail: "Sin imagen",
  code: "abc987",
  stock: 35,
};

const newData = {
  title: "Nuevo Nombre Producto Prueba",
  price: 500,
  stock: 50,
};

// Proceso de Testing

// const appManager = new ProductManager("./productsDB.json");
// appManager.getProducts();
// appManager.addProduct(productA);
// appManager.getProducts();
// appManager.addProduct(productB);
// appManager.getProducts();
// appManager.getProductByID(2)
// appManager.getProductByID(9)
// appManager.updateProduct(2,newData)
// appManager.updateProduct(9, newData)
// appManager.deleteProduct(9)
// appManager.deleteProduct(3)

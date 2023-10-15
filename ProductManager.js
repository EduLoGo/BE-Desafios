class ProductManager {
  id = 1;
  constructor() {
    this.products = [];
  }
  addProduct(newProduct) {
    let checkCode = this.products.some((elem) => elem.code === newProduct.code);
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
      let productUpdated = { id: this.id, ...newProduct };
      this.products.push(productUpdated);
      this.id++;
      return console.log(`Product added successfully`);
    }
  }
  getProduct() {
    console.log(this.products);
  }
  getProductByID(id) {
    let existProduct = this.products.find((elem) => elem.id === id);
    if (existProduct) {
      return console.log(existProduct);
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
  description: "Este es otro producto de prueba",
  price: 800,
  thumbnail: "Sin imagen",
  code: "abc987",
  stock: 50,
};

//Testing Process
const productManager = new ProductManager();
productManager.getProduct();
productManager.addProduct(productA);
productManager.getProduct();
productManager.addProduct(productA);
productManager.getProductByID(2);

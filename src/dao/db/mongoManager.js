import mongoose from "mongoose";

export class MongoManager {
  constructor(collectionName, schema) {
    this.db = mongoose.model(collectionName, schema);
  }
  // Validación de ID
  validateId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID not valid");
    }
  }

  // Manejo de Products
  async productAll(limit) {
    try {
      const dbData = await this.db.find({}).limit(limit).lean();
      return dbData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async productById(id) {
    this.validateId(id);
    try {
      const productId = await this.db.find({ status: true, _id: id });
      return productId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async productAdd(product) {
    let existCode = await this.db.findOne({ code: product.code });
    if (existCode) {
      throw new Error(`Code already exist`);
    }
    try {
      const newProduct = await this.db.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async productUpdate(id, product) {
    this.validateId(id);
    try {
      const productId = await this.db.findByIdAndUpdate(id, product, {
        new: true,
      });
      return productId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async productDelete(id) {
    this.validateId(id);
    try {
      const productId = await this.db.findByIdAndDelete(id);
      return productId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Manejo de Carts

  async createCart() {
    try {
      await this.db.create({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async cartById(id) {
    this.validateId(id);
    try {
      const cartId = this.db.findById(id);
      return cartId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async cartUpdate(id, cart) {
    try {
      const cartId = await this.db.findByIdAndUpdate(id, cart, {
        new: true,
      });
      return cartId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  /// Mensajes

  async messageAll() {
    try {
      const dbMsg = await this.db.find({}).sort({ _id: -1 }).lean();
      return dbMsg;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async messageSave(message) {
    try {
      await this.db.create(message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

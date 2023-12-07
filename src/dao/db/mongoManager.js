import mongoose from "mongoose";

export class MongoManager {
  constructor(collectionName, schema) {
    this.db = mongoose.model(collectionName, schema);
  }
  async productAll(limit) {
    try {
      const dbData = await this.db.find({}).limit(limit).lean();
      return dbData;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async productById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID not valid");
    }
    try {
      const productId = await this.db.findOne({ status: true, _id: id }).lean();
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID not valid");
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID not valid");
    }
    try {
      const productId = await this.db.findByIdAndDelete(id, {
        new: true,
      });
      return productId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createCart() {
    try {
      await this.db.create({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async cartById(id) {
    try {
      const cartId = this.db.findById(id);
      return cartId;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async messageAll() {
    try {
      const dbMsg = await this.db.find({}).lean();
      return dbMsg;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async messageSave (message) {
    try {
      await this.db.create(message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

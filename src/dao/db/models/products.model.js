import mongoose from "mongoose";

// const productsCollection = "products";

export const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: Array },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timesTamps: true,
    strict: true, // No permite agregar campos que ya están declarados.
  }
);

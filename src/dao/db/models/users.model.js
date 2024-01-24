import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "Usuario" },
  },
  {
    timestamps: true,
    strict: true,
  }
);

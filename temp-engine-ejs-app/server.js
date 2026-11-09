import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import {
  createProductForm,
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct
} from "./controllers/productController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// Display the form to add a product
app.get("/product-form", createProductForm);

// Create a product
app.post("/add-product", createProduct);

// Display all products
app.get("/", readProducts);

// Display one product's details
app.get("/product/:id", readProductById);

// Display the form to edit a product
app.get("/product-form/:id", updateProductForm);

// Update a product
app.post("/update-product/:id", updateProduct);

// Delete a product
app.get("/delete-product/:id", deleteProduct);

// Connect to MongoDB before starting the server
const startServer = async () => {
  await connectDB(process.env.MONGO_URI, process.env.DB_NAME);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
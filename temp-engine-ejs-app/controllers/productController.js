import Product from "../models/productModel.js";

// Display the form to create a product
const createProductForm = (req, res) => {
  res.render("product_form", { product: null });
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    const product = new Product({
      name,
      description,
      category,
      price
    });

    await product.save();
    res.redirect("/");
  } catch (error) {
    res.status(400).render("error", {
      error: error.message
    });
  }
};

// Read all products
const readProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("product", { products });
  } catch (error) {
    res.status(500).render("error", {
      error: error.message
    });
  }
};

// Read a product by ID
const readProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).render("error", {
        error: "Product not found"
      });
    }

    res.render("product_form", { product });
  } catch (error) {
    res.status(400).render("error", {
      error: error.message
    });
  }
};

// Display the edit form
const updateProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).render("error", {
        error: "Product not found"
      });
    }

    res.render("product_form", { product });
  } catch (error) {
    res.status(400).render("error", {
      error: error.message
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).render("error", {
        error: "Product not found"
      });
    }

    res.redirect("/");
  } catch (error) {
    res.status(400).render("error", {
      error: error.message
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).render("error", {
        error: "Product not found"
      });
    }

    res.redirect("/");
  } catch (error) {
    res.status(400).render("error", {
      error: error.message
    });
  }
};

export {
  createProductForm,
  createProduct,
  readProducts,
  readProductById,
  updateProductForm,
  updateProduct,
  deleteProduct
};
import express from 'express';
const app = express();
app.use(express.json());
const products = [];
//CRUD
//create a new product http://localhost:4000/products payload:{id:1, name: "laptop", price:50000}
app.post("/products", (req,res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res
        .status(201)
        .json({message: "Product created successfully", data: newProduct});
});
//Read all students GET http://localhost:4000/products
app.get("/products", (req,res) => {
    res.json({message: "Products retrieved successfully", data: products});
});
//Read a single product by id GET http://localhost:4000/products/id
app.get("/products/:id", (req,res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id===productId);
    if(product) {
        res
            .status(200)
            .json({message: "Product retrieved successfully", data: product});
    } else {
        res.status(404).json({message: "Product not found"});
    }
});
// update a product by id PUT http://localhost:4000/products/:id payload: {id:1, name:"Laptop",price: 60000}
app.put("/products/:id" ,(req,res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id===productId);
    if(productIndex!==-1) {
        const body = req.body;
        const updatedProduct = {...products[productIndex],...body};
        products[productIndex] = updatedProduct;
        res
            .status(200)
            .json({message: "Product updated successfully", data: updatedProduct});
    } else {
        res.status(404).json({message: "Product not found"});
    }
});
//delete a product by id DELETE http://localhost:4000/products/:id
app.delete("/products/:id", (req,res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id===productId);
    if(productIndex!==-1) {
        const deletedProduct = products.splice(productIndex,1)[0];
        res
            .status(200)
            .json({message: "Product deleted successfully", data:deletedProduct});
    } else {
        res.status(404).json({message: "Product not found"});
    }
});
app.listen(4000, () => {
    console.log("Server running at http://localhost:4000/products");
});
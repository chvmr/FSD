import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(morgan("dev"));

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// Connect to MongoDB
mongoose
  .connect(mongoUri, { dbName })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

  // Define the Post schema and model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model("Post", postSchema);

//CRUD operations for Blog Posts
// Create a new post
app.post("/api/v1/posts", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send({ message: "Post created successfully", data: post });
  } catch (err) {
    res.status(400).send(err);
  }
});
//Read all posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res
      .status(200)
      .send({ message: "Posts retrieved successfully", data: posts });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Read post by id
app.get("/api/v1/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res
      .status(200)
      .send({ message: "Post retrieved successfully", data: post });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update post by id
app.put("/api/v1/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post updated successfully", data: post });
  } catch (err) {
    res.status(400).send(err);
  }
});
//Delete post by id
app.delete("/api/v1/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post deleted successfully", data: post });
  } catch (err) {
    res.status(400).send(err);
  }
});
//Test route
app.get("/", (req, res) => {
  res.send({ message: "Welcome to Express Test" });
});
//Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
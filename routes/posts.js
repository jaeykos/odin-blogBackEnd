const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const dateFormat = require("dateformat");

//Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: "descending" });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get one post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//create one post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update one post
router.put("/:id", async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      content: req.body.content,
      dateUpdated: Date.now(),
    };
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      update,
      { new: true }
    );
    res.json(updatedPost);

    if (updatedPost == null) {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete one post
router.delete("/:id", async (req, res) => {
  const deletedPost = await Post.findOneAndDelete({ _id: req.params.id });
  if (deletedPost == null) {
    res.status(404).json({ message: "Post not found" });
  } else {
    res.json(deletedPost);
  }
});

//delete all
router.delete("/", async (req, res) => {
  try {
    await Post.deleteMany({});
    res.send("all deleted successfully");
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;

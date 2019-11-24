const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const filePath = "../../store/initial_data.json";
const initialData = require(filePath);

router.get("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "Just some testing data.",
    posts: initialData.posts
  });
});

router.post("/api/posts", (req, res, next) => {
  const post = req.body;
  initialData.posts.push(post);
  fs.writeFile(
    path.join(__dirname, filePath),
    JSON.stringify(initialData, null, 2),
    err => {
      if (err) return res.status(422).json(err);
      res.status(200).json({
        message: "Post created successfully."
      });
    }
  );
});

router.put("/api/posts/:id", (req, res, next) => {
  const id = req.params.id;
  const post = req.body;
  const index = initialData.posts.findIndex(el => el._id == post._id);

  if (index != -1) {
    initialData.posts[index] = post;
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      err => {
        if (err) return res.status(422).json(err);
        res.status(200).json({
          message: "Post successfully updated."
        });
      }
    );
  } else {
    res.status(422).json({
      message: "Post not found!"
    });
  }
});

router.delete("/api/posts/:id", (req, res, next) => {
  const id = req.params.id;
  const index = initialData.posts.findIndex(el => el._id == id);

  if (index != -1) {
    initialData.posts.splice(index, 1);
    fs.writeFile(
      path.join(__dirname, filePath),
      JSON.stringify(initialData, null, 2),
      err => {
        if (err) return res.status(422).json(err);
        res.status(200).json({
          message: "Data has been deleted."
        });
      }
    );
  } else {
    res.status(422).json({
      message: "Post not found!"
    });
  }
});

module.exports = router;

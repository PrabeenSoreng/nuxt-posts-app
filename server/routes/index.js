const fs = require("fs");
const path = require("path");
const express = require("express");

const router = express.Router();

const filePath = "../../store/initial_data.json";
const initialData = require(filePath);

router.get("/api/posts", (req, res, next) => {
  res.status(200).json({
    message: "Just some testing data."
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
        message: "Data has been saved."
      });
    }
  );
});

router.patch("/api/posts/:id", (req, res, next) => {
  res.status(200).json({
    message: "Data has been updated."
  });
});

router.delete("/api/posts/:slug", (req, res, next) => {
  res.status(200).json({
    message: "Data has been deleted."
  });
});

module.exports = router;

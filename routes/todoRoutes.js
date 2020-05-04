const express = require("express");

const router = express.Router();
const TodoModel = require("../models/todomodel");

router.get("/todos/test", (req, res) => {
  return res.status(200).send("<h1>happy</h1>");
});

router.get("/todos", (req, res) => {
  TodoModel.find((err, results) => {
    if (err) {
      res.status(400).json({ error: true, message: "didnt recieve totdos" });
    } else {
      const newResults = results.map((todo) => {
        return {
          id: todo.id,
          title: todo.title,
          done: todo.done,
        };
      });
      res.status(200).json([...newResults]);
    }
  });
});

router.get("todo/:id", (req, res) => {
  TodoModel.findById(req.params.id, (err, results) => {
    if (err) {
      res.status(404).json({ error: true, message: "didnt recieve todo" });
    } else {
      res.status(200).json({ message: "ok", result });
    }
  });
});

router.post("/todo", (req, res) => {
  const newTodo = new TodoModel(req.body);

  newTodo
    .save()
    .then((todo) => {
      res
        .status(200)
        .json({ id: todo._id, title: todo.title, done: todo.done });
    })
    .catch((err) => {
      res.status(500).json({ error: true, message: "could not post!" });
    });
});

router.delete("/todo/:id", (req, res) => {
  TodoModel.findByIdAndRemove(req.params.id),
    (err, todo) => {
      if (err) {
        res.status(500).json({
          error: true,
          message: "We could not complete your request.",
        });
      } else if (todo) {
        res.status(200).json({
          message: "Successfully removed the requested item. Thank you.",
          id: todo._id,
        });
      } else {
        res.status(500).json({
          error: true,
          message: "it dont exist",
        });
      }
    };
});

module.exports = router;

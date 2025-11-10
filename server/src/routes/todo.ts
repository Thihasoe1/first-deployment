import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/create", createTodo);
router.get("/getTodos", getTodos);
router.get("/getTodo/:todoId", getTodo);
router.put("/updateTodo/:todoId", updateTodo);
router.delete("/deleteTodo/:todoId", deleteTodo);

export default router;

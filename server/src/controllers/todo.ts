import type { Request, Response } from "express";
import { Todo } from "../models/todo.js";

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const newTodo = await Todo.create({
      title,
    });
    res
      .status(201)
      .json({ message: "create todo successfully", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  try {
    res.status(200).json({ message: "TodoList Data", todo: todos });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    const todo = await Todo.findById(todoId);
    res.status(200).json({ message: "fetch data successfully", todo: todo });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  const { title } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, { title });
    res.status(200).json({ message: "update todo successfully", todo: todo });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { todoId } = req.params;
  try {
    await Todo.findByIdAndDelete(todoId);
    res.status(200).json({ message: "Delete data successfully" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

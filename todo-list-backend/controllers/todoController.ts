import { Request, Response } from "express";
import { todoService } from "../services/todoService";

const dateTime = new Date().toJSON();

/**
 * Handle HTTP requests for to-do operations
 */

export const healthCheck = async (req: Request, res: Response) => {
  res.send(`Todo APIs is running [${dateTime}]`);
};

export const getTodos = async (req: Request, res: Response) => {
  const todos = await todoService.getTodos();
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Invalid input: title is required" });
  }
  const todo = await todoService.createTodo({ title, description, priority });
  res.status(200).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  console.log("update req", req);
  const id = Number(req.params.id);
  const data = req.body;
  const todo = await todoService.updateTodo(id, data);
  res.status(200).json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await todoService.deleteTodo(id);
  res.status(200).json({ message: `Item #${id} deleted` });
};

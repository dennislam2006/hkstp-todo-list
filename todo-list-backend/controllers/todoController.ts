import { NextFunction, Request, Response } from "express";
import { todoService } from "../services/todoService";

const dateTime = new Date().toJSON();

/**
 * Handle HTTP requests for to-do operations
 */

export const healthCheck = async (req: Request, res: Response) => {
  res.send(`Todo APIs is running [${dateTime}]`);
};

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoService.getTodos();
    res.json(todos);
  } catch (e) {
    next(e); // Pass error to middleware
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, priority } = req.body;
    if (!title) {
      throw new Error("Invalid input: title and valid priority required");
    }
    const todo = await todoService.createTodo({ title, description, priority });
    res.status(200).json(todo);
  } catch (e) {
    next(e);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const todo = await todoService.updateTodo(id, data);
    res.status(200).json(todo);
  } catch (e) {
    next(e);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    await todoService.deleteTodo(id);
    res.status(200).json({ message: `Item #${id} deleted` });
  } catch (e) {
    next(e);
  }
};

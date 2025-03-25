import { NextFunction, Request, Response } from "express";
import { todoService } from "../services/todoService";

export const healthCheck = async (req: Request, res: Response) => {
  const dateTime = new Date().toISOString();
  try {
    // Test Firebase connectivity by fetching todos
    await todoService.getTodos();
    res.status(200).send(`Todo APIs is running with Firebase [${dateTime}]`);
  } catch (error) {
    console.error("Health check failed:", error);
    res
      .status(503)
      .send(
        `Todo APIs is running but Firebase failed [${dateTime}] - Error: ${
          (error as Error).message
        }`
      );
  }
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

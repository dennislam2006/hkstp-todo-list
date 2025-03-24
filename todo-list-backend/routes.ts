import express from "express";
import {
  healthCheck,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./controllers/todoController";

const router = express.Router();

router.get("/health", healthCheck);
router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;

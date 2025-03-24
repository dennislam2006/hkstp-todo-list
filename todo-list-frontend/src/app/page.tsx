'use client';

import { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import { Todo, TodoPriority } from '../../types/todo';
// import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../lib/api';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    // fetchTodos().then(setTodos);
  }, []);

  const handleCreateOrUpdate = async ({ title, description, priority }: { title: string; description?: string; priority: TodoPriority }) => {
    // if (editingTodo) {
    //   await updateTodo(editingTodo.id, { title, description, priority });
    //   setEditingTodo(null);
    // } else {
    //   await createTodo({ title, description, priority });
    // }
    // setTodos(await fetchTodos());
  };

  const handleToggle = async (id: number) => {
    // const todo = todos.find((t) => t.id === id);
    // if (todo) {
    //   await updateTodo(id, { completed: !todo.completed });
    //   setTodos(await fetchTodos());
    // }
  };

  const handleDelete = async (id: number) => {
    // await deleteTodo(id);
    // setTodos(await fetchTodos());
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h1" gutterBottom sx={{ color: 'grey.100' }}>
        Todo List
      </Typography>
      <TodoForm onSubmit={handleCreateOrUpdate} initialTodo={editingTodo || undefined} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </Container>
  );
}
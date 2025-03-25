'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Alert } from '@mui/material';
import TodoList from '../../components/TodoList';
import TodoForm from '../../components/TodoForm';
import { Todo, TodoPriority } from '../../types/todo';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../../api/todo'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [successMsg, setSuccessMsg] = useState<string>('')

  useEffect(() => {
    fetchTodos().then(setTodos);
  }, []);

  const handleCreateOrUpdate = async ({ title, description, priority }: { title: string; description?: string; priority: TodoPriority }) => {
    if (editingTodo) {
      const updateResult = await updateTodo(editingTodo.id, { title, description, priority, completed: editingTodo.completed });
      if(updateResult?.id) setSuccessMsg(`Todo item #${updateResult.id} updated successful!`)
      setEditingTodo(null);
    } else {
      const createResult = await createTodo({ title, description, priority });
      if(createResult?.id) setSuccessMsg(`Todo item #${createResult.id} created successful!`)
    }
    setTodos(await fetchTodos());
  };

  const handleToggle = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      await updateTodo(id, { 
        title: todo.title,
        description: todo.description,
        completed: !todo.completed,
        priority: todo.priority
      });
      setSuccessMsg(`Todo item #${id} updated successful!`)
      setTodos(await fetchTodos());
    }
  };

  const handleDelete = async (id: number) => {
    const deleteResponse = await deleteTodo(id);
    if(deleteResponse?.message) setSuccessMsg(`Todo item #${id} deleted successful!`)
    setTodos(await fetchTodos());
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
  };

  /** Clear interval */
  useEffect(() => {
    let timer:any
    if(successMsg) {
      timer = setInterval(() => {
        setSuccessMsg('')
      }, 3000)
    }
    return (() => clearInterval(timer))
  }, [successMsg])

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h1" gutterBottom sx={{ color: 'grey.100' }}>
        Todo List
      </Typography>
      {successMsg && <Alert severity="success" sx={{marginBottom: 2}}>{successMsg}</Alert> || null}
      <TodoForm onSubmit={handleCreateOrUpdate} initialTodo={editingTodo || undefined} />
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
    </Container>
  );
}
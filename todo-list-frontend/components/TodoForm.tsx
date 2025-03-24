import { useState, useEffect, Fragment } from 'react';
import { Typography, Button, TextField, Box, MenuItem, Select, FormControl, InputLabel, Alert, AlertTitle } from '@mui/material';
import { Todo, TodoPriority } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: { title: string; description?: string; priority: TodoPriority }) => void;
  initialTodo?: Partial<Todo>;
}

export default function TodoForm({ onSubmit, initialTodo }: TodoFormProps) {
  const [title, setTitle] = useState(initialTodo?.title || '');
  const [description, setDescription] = useState(initialTodo?.description || '');
  const [priority, setPriority] = useState<TodoPriority>(initialTodo?.priority || TodoPriority.LOW);
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title || '');
      setDescription(initialTodo.description || '');
      setPriority(initialTodo.priority || TodoPriority.LOW);
    }
  }, [initialTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    if (!title.trim()) {
      setError('Title is required')
    };
    onSubmit({ title, description: description || undefined, priority });
    setTitle('');
    setDescription('');
    setPriority(TodoPriority.LOW);
  };

  return (
    <Fragment>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          marginBottom: 2,
          bgcolor: 'grey.900',
          p: 2,
          borderRadius: 1,
        }}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ input: { color: 'grey.100' }, label: { color: 'grey.400' }, fieldset: { borderColor: 'grey.700' } }}
        />
        <TextField
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ input: { color: 'grey.100' }, label: { color: 'grey.400' }, fieldset: { borderColor: 'grey.700' } }}
        />
        <FormControl fullWidth sx={{ minWidth: 120 }}>
          <InputLabel sx={{ color: 'grey.400' }}>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TodoPriority)}
            size="small"
            sx={{ color: 'grey.100', fieldset: { borderColor: 'grey.700' } }}
          >
            <MenuItem value={TodoPriority.HIGH}>High</MenuItem>
            <MenuItem value={TodoPriority.MEDIUM}>Medium</MenuItem>
            <MenuItem value={TodoPriority.LOW}>Low</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: 'primary.main', minWidth: { xs: '100%', sm: 'auto' } }}
        >
          {initialTodo ? 'Update' : 'Add'}
        </Button>
      </Box>
      {error && 
      <>
        <Alert severity="error" sx={{ marginTop: 2, marginBottom: 2}}>
          <AlertTitle>Error</AlertTitle>
          Title is required!
        </Alert>
      </> || null }
    </Fragment>
  );
}
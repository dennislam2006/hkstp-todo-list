import { List, Typography } from '@mui/material';
import TodoItem from './TodoItem';
import type {TodoList as TodoListProps} from '../types/todo';

export default function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <List sx={{ bgcolor: 'grey.900', borderRadius: 1, p: 2 }}>
        {todos.length && todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )) || 
        <Typography variant="h4" sx={{ color: 'white' }}>
            Todo List is empty
      </Typography>
      }
    </List>
  );
}
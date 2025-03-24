import { ListItem, Checkbox, IconButton, Typography, Chip, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {Todo, TodoPriority} from '../types/todo'

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {

  const priorityColor = {
    [TodoPriority.HIGH]: 'error',
    [TodoPriority.MEDIUM]: 'warning',
    [TodoPriority.LOW]: 'success',
  }[todo.priority];

  return (
   <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'grey.800',
        padding: '12px 0',
        bgcolor: 'grey.900',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          sx={{ color: 'grey.400', '&.Mui-checked': { color: 'primary.main' } }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? 'grey.600' : 'grey.100',
            }}
          >
            {todo.title}
          </Typography>
          {todo.description && (
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              {todo.description}
            </Typography>
          )}
        </Box>
        <IconButton onClick={() => onEdit(todo)} aria-label="edit" sx={{ color: 'grey.300' }}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(todo.id)} aria-label="delete" sx={{ color: 'grey.300' }}>
          <Delete />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip label={todo.priority} color={priorityColor} size="small" />
        <Typography variant="caption" sx={{ color: 'grey.500' }}>
          Created: {todo.createdAt.toLocaleString()}
        </Typography>
        {todo.updatedAt && (
          <Typography variant="caption" sx={{ color: 'grey.500' }}>
            Updated: {todo.updatedAt.toLocaleString()}
          </Typography>
        )}
      </Box>
      </ListItem>
  );
}
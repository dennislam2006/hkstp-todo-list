import { Button, ListItem, Checkbox, IconButton, Typography, Chip, Box, Stack, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {Todo, TodoPriority} from '../types/todo'
import { formatDate } from '../lib/lib';
import { useState } from 'react'

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  
  const priorityColor = {
    [TodoPriority.HIGH]: 'error',
    [TodoPriority.MEDIUM]: 'warning',
    [TodoPriority.LOW]: 'success',
  }[todo.priority];

  const handleDeleteClick = () => {
    setOpenDialog(true)
  }

  const handleConfirmDelete = () => {
    onDelete(todo.id);
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <>
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
          <Stack direction="row" spacing={1}>
            {todo.completed && <Chip label={'Completed'} color="success" variant='outlined'/> || null }
            <Chip label={todo.priority} color={priorityColor as any} sx={{textTransform: 'uppercase'}} />
          </Stack>
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
            <Tooltip title="Edit">
            <IconButton onClick={() => onEdit(todo)} aria-label="edit" sx={{ color: 'grey.300' }}>
              <Edit />
            </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
            <IconButton onClick={handleDeleteClick} aria-label="delete" sx={{ color: 'grey.300' }}>
              <Delete />
            </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'grey.500' }}>
              Created: {formatDate(todo.createdAt)}
            </Typography>
            {todo.updatedAt && (
              <Typography variant="caption" sx={{ color: 'grey.500' }}>
              || Updated: {formatDate(todo.updatedAt)}
              </Typography>
            )}
          </Box>
      </ListItem>
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{todo.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
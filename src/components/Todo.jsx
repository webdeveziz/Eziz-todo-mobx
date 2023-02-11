import { Box, Checkbox, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { listStore } from '../stores/listStore'
import { observer } from 'mobx-react'

export const Todo = observer(
  ({ id, title, completed, remove, complete, onFilter }) => {
    return (
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Checkbox
          checked={completed}
          onChange={() => {
            complete(id)
          }}
        />
        <Typography
          sx={{ textDecoration: completed && 'line-through orangered' }}
        >
          {title}
        </Typography>
        <DeleteIcon
          onClick={() => {
            remove(id)
            onFilter()
          }}
        />
      </Box>
    )
  },
)

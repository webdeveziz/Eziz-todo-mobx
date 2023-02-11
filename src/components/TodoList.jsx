import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import { Todo } from './Todo'
import { listStore } from '../stores/listStore'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import WbTwilightIcon from '@mui/icons-material/WbTwilight'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ClearIcon from '@mui/icons-material/Clear'

const store = listStore()

export const TodoList = observer(() => {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState(store.todos)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.setAttribute('data-theme', store.theme)
    setTheme(store.theme)
    console.log(theme)
  }, [theme])

  const handleChange = ({ target }) => {
    setInput(target.value)
  }

  const handleAdd = () => {
    store.add(input)
    setInput('')
  }

  const handleFilter = (filter) => {
    switch (filter) {
      case 'all': {
        setTodos(store.todos)
        break
      }
      case 'completed': {
        const tds = store.todos.filter((todo) => todo.completed === true)
        setTodos(tds)
        break
      }
      case 'active': {
        const tds = store.todos.filter((todo) => todo.completed !== true)
        setTodos(tds)
        break
      }
      default:
        setTodos(store.todos)
    }
  }

  return (
    <Box
      sx={{
        width: '1000px',
        margin: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{ margin: '15px 0', fontSize: '24px', fontWeight: 600 }}
        >
          To Do list with <b style={{ color: 'orangered' }}>{']mobx['}</b>
        </Typography>
        <WbTwilightIcon
          sx={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={() => {
            store.toggleTheme()
            setTheme(store.theme)
          }}
        />
      </Box>

      <Divider className="hr" />

      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          margin: '15px 0',
        }}
      >
        <TextField
          className="input"
          value={input}
          onChange={handleChange}
          label="Create a new todo..."
          variant="outlined"
        />
        <Button
          className="btn"
          variant="outlined"
          onClick={handleAdd}
          disabled={!input}
          sx={{ color: 'var(--colors-text)' }}
        >
          Add todo
        </Button>
      </Box>
      <Divider className="hr" />
      <Box>
        {todos.length ? (
          <Box>
            {todos.map((todo) => {
              return (
                <Todo
                  key={todo.id.toString()}
                  {...todo}
                  remove={store.remove}
                  complete={store.complete}
                  onFilter={handleFilter}
                />
              )
            })}
            <Divider className="hr" />
          </Box>
        ) : (
          <h2>List is empty!</h2>
        )}
        <Divider className="hr" />
        {store.todos.length && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '15px',
              p: '20px 10px 0px 0px',
              color: 'grey',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: 'auto',
              }}
            >
              <FormatListBulletedIcon />
              <b
                style={{
                  marginLeft: '6px',
                  marginRight: '6px',
                }}
              >
                {todos.length}{' '}
              </b>{' '}
              Tasks
            </Box>
            <Typography>All tasks can be filtered by </Typography>
            <Button
              onClick={() => {
                handleFilter('all')
              }}
              sx={{
                textTransform: 'lowercase',
                height: '30px',
              }}
              variant="text"
            >
              All todos
            </Button>
            <Button
              onClick={() => {
                handleFilter('completed')
              }}
              sx={{
                textTransform: 'lowercase',
                height: '30px',
              }}
              variant="text"
            >
              Completed todos
            </Button>
            <Button
              onClick={() => {
                handleFilter('active')
              }}
              sx={{
                textTransform: 'lowercase',
                height: '30px',
              }}
              variant="text"
            >
              Active todos
            </Button>
            <Button
              onClick={() => {
                store.clearCompleted()
                handleFilter()
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: 'auto',
                textTransform: 'capitalize',
                height: '30px',
              }}
              variant="text"
            >
              <ClearIcon /> Clear completed
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
})

import { action, makeObservable, observable } from 'mobx'
import { nanoid } from 'nanoid'

export const listStore = () => {
  return makeObservable(
    {
      theme: 'light',
      todos: [
        {
          id: 1,
          title: 'delectus aut autem',
          completed: true,
        },
        {
          id: 2,
          title: 'quis ut nam facilis et officia qui',
          completed: false,
        },
        {
          id: 3,
          title: 'fugiat veniam minus',
          completed: false,
        },
        {
          id: 4,
          title: 'et porro tempora',
          completed: true,
        },
        {
          id: 5,
          title:
            'laboriosam mollitia et enim quasi adipisci quia provident illum',
          completed: false,
        },
      ],
      add(title) {
        this.todos.push({
          id: nanoid(5),
          title,
          completed: false,
        })
      },
      remove(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id)
      },
      complete(id) {
        this.todos.forEach((el) => {
          if (el.id === id) {
            el.completed = !el.completed
          }
        })
      },
      clearCompleted() {
        this.todos = this.todos.map((el) => ({
          ...el,
          completed: false,
        }))
      },
      toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
      },
    },
    {
      todos: observable,
      add: action.bound,
      remove: action.bound,
      complete: action.bound,
      toggleTheme: action.bound,
    },
  )
}

"use-strict";
import * as type from "../actionType";
const initialState = {
  todos: []
};
const todos = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case type.DELETE_TODO_SUCCESS:
      let deleteTodo = state.todos.filter(x => x.id != action.payload.id);
      return {
        ...state,
        todos: deleteTodo
      };
    case type.UPDATE_TODO_SUCCESS:
      // Update Todos
      let newUpdateTodos = state.todos.map((todo, index) => {
        if (todo.id == action.payload.id) {
          return {
            ...todo,
            task: action.payload.task
          };
        } else {
          return {
            ...todo
          };
        }
      });
      return {
        ...state,
        todos: newUpdateTodos
      };
    case type.READ_TODO_SUCCESS:
      // Read Todos
      let newUpdateReadTodos = state.todos.map((todo, index) => {
        if (todo.id == action.payload.id) {
          return {
            ...todo,
            isRead: true
          };
        } else {
          return {
            ...todo
          };
        }
      });
      return {
        ...state,
        todos: newUpdateReadTodos
      };
    default:
      return state;
  }
};
export default todos;

import {
  GET_USERS,
  ADD_USER,
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  UPDATE_TASK,
  TOGGLE_COMPLETED,
  FILTER_TASKS_TITLE,
  FILTER_TASKS_STATUS,
  FILTER_TASKS_DATE,
} from "./Actions";

const initialState = {
  users: [],
  tasksList: [],
  TaskSearch: [],
  TaskFilter: [],
  TaskFilterByStatus: [],
  TaskFilterByPriority: [],
  TaskFilterByDate: [],
  TaskFilterByTitle: [],
  TaskFilterByDescription: [],
  TaskFilterByUser: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case GET_TASKS:
      return {
        ...state,
        tasksList: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksList: [...state.tasksList, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksList: state.tasksList.filter((task) => task.id !== action.payload),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasksList: state.tasksList.map((task) =>
          task.id === action.payload._id ? action.payload : task
        ),
      };
    case TOGGLE_COMPLETED:
      return {
        ...state,
        tasksList: state.tasksList.map((task) =>
          task.id === action.payload._id ? action.payload : task
        ),
      };
    case FILTER_TASKS_TITLE:
      return {
        ...state,
        TaskFilterByTitle: state.tasksList.filter((task) =>
          task.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case FILTER_TASKS_STATUS:
      return {
        ...state,
        TaskFilterByStatus: state.tasksList.filter(
          (task) => task.completed === action.payload
        ),
      };
    case FILTER_TASKS_DATE:
      return {
        ...state,
        TaskFilterByDate: state.tasksList.filter((task) =>
          task.due.includes(action.payload)
        ),
      };
    default:
      return state;
  }
};

export default Reducer;

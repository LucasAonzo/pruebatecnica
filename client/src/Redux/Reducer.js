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
  filteredTasks: [],
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
        filteredTasks: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksList: [...state.tasksList, action.payload],
        filteredTasks: [...state.tasksList, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksList: state.tasksList.filter((task) => task.id !== action.payload),
        filteredTasks: state.filteredTasks.filter(
          (task) => task.id !== action.payload
        ),
      };
    case UPDATE_TASK:
      const updatedTasks = state.tasksList.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasksList: updatedTasks,
        filteredTasks: updatedTasks,
      };
    case FILTER_TASKS_TITLE:
      return {
        ...state,
        filteredTasks: state.tasksList.filter((task) =>
          task.title.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case FILTER_TASKS_STATUS:
      return {
        ...state,
        filteredTasks: state.tasksList.filter((task) =>
          action.payload === ""
            ? true
            : task.completed === (action.payload === "true")
        ),
      };
    case FILTER_TASKS_DATE:
      const sortedByDate = [...state.tasksList].sort((a, b) => {
        if (action.payload === "asc") {
          return new Date(a.due) - new Date(b.due);
        } else {
          return new Date(b.due) - new Date(a.due);
        }
      });
      return {
        ...state,
        filteredTasks: sortedByDate,
      };
    case "SORT_TASKS_TITLE":
      const sortedByTitle = [...state.tasksList].sort((a, b) => {
        if (action.payload === "asc") {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });
      return {
        ...state,
        filteredTasks: sortedByTitle,
      };
    default:
      return state;
  }
};

export default Reducer;

import axios from "axios";

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_TASKS = "GET_TASKS";
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
export const FILTER_TASKS_TITLE = "FILTER_TASKS_TITLE";
export const FILTER_TASKS_STATUS = "FILTER_TASKS_STATUS";
export const FILTER_TASKS_DATE = "FILTER_TASKS_DATE";

const URL = "http://localhost:3001";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/users`);
      dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/users`, user);
      dispatch({
        type: ADD_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/users/${id}`);
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}/tasks`);
      dispatch({
        type: GET_TASKS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/tasks`, task);
      dispatch({
        type: ADD_TASK,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    try {
      if (!id) {
        throw new Error("ID is required for deletion");
      }
      await axios.delete(`${URL}/tasks/${id}`);
      dispatch({
        type: DELETE_TASK,
        payload: id,
      });
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };
};

export const updateTask = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL}/tasks/${task.id}`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "UPDATE_TASK",
      payload: response.data,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la tarea:",
      error.response ? error.response.data : error.message
    );
  }
};

export const toggleCompleted = (task) => async (dispatch) => {
  try {
    const response = await axios.put(`${URL}/tasks/${task.id}`, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: TOGGLE_COMPLETED,
      payload: response.data,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la tarea:",
      error.response ? error.response.data : error.message
    );
  }
};

export const filterTasksByTitle = (title) => {
  return {
    type: FILTER_TASKS_TITLE,
    payload: title,
  };
};

export const filterTasksByStatus = (status) => {
  return {
    type: FILTER_TASKS_STATUS,
    payload: status,
  };
};

export const filterTasksByDate = (date) => {
  return {
    type: FILTER_TASKS_DATE,
    payload: date,
  };
};

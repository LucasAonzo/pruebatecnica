import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchTasks, addTask, deleteTask, updateTask } from "../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import Form from "../components/Form";
import FormPopUp from "../components/FormPopUp";
import Filters from "../components/Filters";

const Front = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksList.tasksList) || [];

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
    due: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
  };

  const handleDelete = (id) => {
    if (!id) {
      return;
    }
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleUpdate = (updatedTask) => {
    dispatch(updateTask(updatedTask))
      .then(() => {
        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea:", error);
      });
    setIsEditing(false);
    setSelectedTask(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Form
        task={task}
        setTask={setTask}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Filters />
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="mb-4 p-4 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-gray-500">
                Fecha Creacion: {new Date(task.created_at).toLocaleString()}
              </p>
              <p className="text-gray-500">
                Fecha Limite: {formatDate(task.due)}
              </p>

              <p className="text-gray-500">id: {task.id}</p>
              <p className="text-gray-500">
                Status: {task.completed ? "Completeda" : "Pendiente"}
              </p>
              <button
                onClick={() => handleEdit(task)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-4"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </ul>
      {isEditing && (
        <FormPopUp
          task={selectedTask}
          onClose={handleClosePopup}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Front;

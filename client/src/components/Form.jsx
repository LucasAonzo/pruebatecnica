import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateTask, addTask } from "../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksList.tasksList) || [];

  const [task, setTask] = useState({
    title: "",
    description: "",
    due: new Date(),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task in handleSubmit: ", task);
    dispatch(addTask(task));
  };

  const handleDateChange = (date) => {
    setTask({
      ...task,
      due: date,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Tareas</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Titulo de la tarea"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Descripción de la tarea"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div className="mb-4">
          <DatePicker
            selected={task.due}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Form;

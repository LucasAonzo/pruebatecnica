import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormPopUp = ({ task, onClose, onUpdate }) => {
  const [editedTask, setEditedTask] = useState({
    id: "",
    title: "",
    description: "",
    due: new Date(),
  });

  useEffect(() => {
    if (task) {
      setEditedTask({
        id: task.id,
        title: task.title,
        description: task.description,
        due: new Date(task.due),
      });
    }
  }, [task]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setEditedTask({
      ...editedTask,
      due: date,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando datos de tarea actualizada:", editedTask); // Verifica los datos aquí
    onUpdate(editedTask); // Llama a la función onUpdate pasada desde Front
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-6">Modificar Tarea</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              placeholder="Titulo de la tarea"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              placeholder="Descripción de la tarea"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <DatePicker
              selected={editedTask.due}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Modificar Tarea
          </button>
        </form>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default FormPopUp;

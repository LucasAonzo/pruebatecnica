import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  fetchTasks,
  filterTasksByTitle,
  filterTasksByStatus,
  filterTasksByDate,
} from "../Redux/Actions";
import { useSelector, useDispatch } from "react-redux";

//componente de filtros, para filtrar por titulo, estado (completado o no) y fecha, tambien una barra de busqueda
const Filters = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasksList.tasksList) || [];
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
    dispatch(filterTasksByTitle(e.target.value));
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
    dispatch(filterTasksByStatus(e.target.value));
  };
  const handleDate = (e) => {
    setDate(e.target.value);
    dispatch(filterTasksByDate(e.target.value));
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Buscar tarea"
        className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <div className="flex justify-center">
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          placeholder="Filtrar por titulo"
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <select
          value={status}
          onChange={handleStatus}
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Filtrar por estado</option>
          <option value="true">Completado</option>
          <option value="false">No completado</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={handleDate}
          className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default Filters;

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Form } from "react-router-dom";
import Front from "./pages/front";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" autoClose={1500} />
      <Routes>
        <Route path="/" element={<Front />} />
      </Routes>
    </div>
  );
}

export default App;

const { Router } = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskcontroller");
const verifyToken = require("../middlewares/verifyToken");

const router = Router();

router.post("/", async (req, res) => {
  const datos = req.body;
  try {
    const task = await createTask(datos);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await getTaskById(id);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  try {
    const task = await updateTask(id, datos);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await deleteTask(id);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

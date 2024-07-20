const { Router } = require("express");
const { createUser, getAllUsers } = require("../controllers/usercontroller");

const router = Router();

router.post("/", async (req, res) => {
  const datos = req.body;
  try {
    const user = await createUser(datos);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

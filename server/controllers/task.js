const authMiddleware = require("../middleware/authMiddleware");
const router = require("express").Router();
const { addTask, eidtTask, getTask, deleteTask } = require("../services/task");

router.post("/addTask", authMiddleware, addTask);
router.put("/editTask/:id", authMiddleware, eidtTask);
router.get("/getTask/:id", authMiddleware, getTask);
router.delete("/deleteTask/:id", authMiddleware, deleteTask);

module.exports = router;

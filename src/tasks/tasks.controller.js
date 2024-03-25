const taskService = require('./tasks.service');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const task = await taskService.getTaskById(taskId);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve task' });
    }
};

const createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const taskData = req.body;
        const updatedTask = await taskService.updateTask(taskId, taskData);
        if (updatedTask) {
            res.json(updatedTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const deleted = await taskService.deleteTask(taskId);
        if (deleted) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
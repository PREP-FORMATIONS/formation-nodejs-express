const taskRepository = require('./tasks.repository');

const getAllTasks = async () => {
    return await taskRepository.loadTasks();
};

const getTaskById = async (id) => {
    const tasks = await taskRepository.loadTasks();
    return tasks.find((task) => task.id === id);
};

const createTask = async (taskData) => {
    const tasks = await taskRepository.loadTasks();
    const newTask = { ...taskData, id: generateUniqueId(tasks) };
    tasks.push(newTask);
    await taskRepository.saveTasks(tasks);
    return newTask;
};

const updateTask = async (id, taskData) => {
    const tasks = await taskRepository.loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
        await taskRepository.saveTasks(tasks);
        return tasks[taskIndex];
    }
    return null;
};

const deleteTask = async (id) => {
    const tasks = await taskRepository.loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        await taskRepository.saveTasks(tasks);
        return true;
    }
    return false;
};

const generateUniqueId = (tasks) => {
    const maxId = tasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
    return maxId + 1;
};

const updateTasksUserIdToNull = async (userId) => {
    const tasks = await taskRepository.loadTasks();
    const updatedTasks = tasks.map((task) => {
        if (task.user_id === userId) {
            return { ...task, user_id: null };
        }
        return task;
    });
    await taskRepository.saveTasks(updatedTasks);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTasksUserIdToNull
};
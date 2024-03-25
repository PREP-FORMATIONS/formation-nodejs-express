const { loadFile, writeToFile } = require('../utils/file.utils');

const loadTasks = async () => {
    const tasksData = await loadFile('tasks.json');
    return JSON.parse(tasksData);
};

const saveTasks = async (tasks) => {
    await writeToFile('tasks.json', tasks);
};

module.exports = {
    loadTasks,
    saveTasks,
};
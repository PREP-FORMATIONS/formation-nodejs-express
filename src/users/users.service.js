const userRepository = require('./users.repository');
const taskService=require("../tasks/tasks.service")

const getAllUsers = async () => {
    return await userRepository.loadUsers();
};

const getUserById = async (id) => {
    const users = await userRepository.loadUsers();
    return users.find((user) => user.id === id);
};

const createUser = async (userData) => {
    const users = await userRepository.loadUsers();
    const newUser = { ...userData, id: generateUniqueId(users), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    users.push(newUser);
    await userRepository.saveUsers(users);
    return newUser;
};

const updateUser = async (id, userData) => {
    const users = await userRepository.loadUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData, updated_at: new Date().toISOString() };
        await userRepository.saveUsers(users);
        return users[userIndex];
    }
    return null;
};

const deleteUser = async (id) => {
    const users = await userRepository.loadUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        await userRepository.saveUsers(users);
        await taskService.updateTasksUserIdToNull(id);
        return true;
    }
    return false;
};

const generateUniqueId = (users) => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
const { loadFile, writeToFile } = require('../utils/file.utils');

const loadUsers = async () => {
    const usersData = await loadFile('users.json');
    return JSON.parse(usersData);
};

const saveUsers = async (users) => {
    await writeToFile('users.json', users);
};

module.exports = {
    loadUsers,
    saveUsers,
};
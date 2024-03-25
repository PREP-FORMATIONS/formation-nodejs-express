const fs = require('fs').promises;
const path = require('path');
const { rootDir } = require('../../config');

const loadFile = async (filename) => {
    try {
        return await fs.readFile(path.join(rootDir, filename), 'utf8');
    } catch (e) {
        throw e;
    }
};

const writeToFile = async (filename, data) => {
    try {
        return await fs.writeFile(path.join(rootDir, filename), JSON.stringify(data));
    } catch (e) {
        throw e;
    }
};

module.exports = {
    loadFile,
    writeToFile,
};
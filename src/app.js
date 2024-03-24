const express = require("express");
const path = require("path");
const { rootDir } = require("../config");
const fs = require("node:fs/promises");


const app = express();

// Tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = JSON.parse(await loadFile('tasks.json'));
        res.status(200).json(tasks);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const tasks = JSON.parse(await loadFile('tasks.json'));
        const task = tasks.find(task => task.id === id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.status(200).json(task);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const tasks = JSON.parse(await loadFile('tasks.json'));
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }
        tasks.splice(taskIndex, 1);
        await writeToFile("tasks.json", tasks);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Users
app.get("/api/users", async (req, res) => {
    try {
        const users = JSON.parse(await loadFile('users.json'));
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/api/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const users = JSON.parse(await loadFile('users.json'));
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        users.splice(userIndex, 1);
        await writeToFile("users.json", users);

        // Update tasks where user_id matches the deleted user's ID
        const tasks = JSON.parse(await loadFile('tasks.json'));
        const updatedTasks = tasks.map(task => {
            if (task.user_id === id) {
                return { ...task, user_id: null };
            }
            return task;
        });
        await writeToFile("tasks.json", updatedTasks);

        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.delete("/api/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const users = JSON.parse(await loadFile('users.json'));
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        users.splice(userIndex, 1);
        await writeToFile("users.json", users);
        return res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

const port = 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));

async function loadFile(filename) {
    try {
        return await fs.readFile(path.join(rootDir, filename), "utf8");
    } catch (e) {
        throw e;
    }
}

async function writeToFile(filename, data) {
    try {
        return await fs.writeFile(path.join(rootDir, filename), JSON.stringify(data));
    } catch (e) {
        throw e;
    }
}
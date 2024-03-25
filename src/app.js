const express = require("express");
const path = require("path");
const { rootDir } = require("../config");
const fs = require("node:fs/promises");

let usersNextId = 1;
let tasksNextId = 1;

const app = express();

app.use(express.json())

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

app.post("/api/tasks", async (req, res) => {
    try {
        const { title, description, start_date, end_date, user_id, parent_id, assignee_id, status } = req.body;
        if (!title || !description || !start_date || !end_date || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const tasks = JSON.parse(await loadFile('tasks.json'));
        const newTask = {
            id: generateUniqueId(tasks, tasksNextId),
            title,
            description,
            start_date,
            end_date,
            user_id: user_id || null,
            parent_id: parent_id || null,
            assignee_id: assignee_id || null,
            status
        };
        tasks.push(newTask);
        await writeToFile("tasks.json", tasks);
        res.status(201).json(newTask);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const { title, description, start_date, end_date, user_id, parent_id, assignee_id, status } = req.body;
        const tasks = JSON.parse(await loadFile('tasks.json'));
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: "Task not found" });
        }
        const updatedTask = {
            ...tasks[taskIndex],
            title: title || tasks[taskIndex].title,
            description: description || tasks[taskIndex].description,
            start_date: start_date || tasks[taskIndex].start_date,
            end_date: end_date || tasks[taskIndex].end_date,
            user_id: user_id !== undefined ? user_id : tasks[taskIndex].user_id,
            parent_id: parent_id !== undefined ? parent_id : tasks[taskIndex].parent_id,
            assignee_id: assignee_id !== undefined ? assignee_id : tasks[taskIndex].assignee_id,
            status: status || tasks[taskIndex].status
        };
        tasks[taskIndex] = updatedTask;
        await writeToFile("tasks.json", tasks);
        res.json(updatedTask);
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

app.get("/api/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const users = JSON.parse(await loadFile('users.json'));
        const user = users.find(user => user.id === id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post("/api/users", async (req, res) => {
    try {
        const { first_name, last_name, email } = req.body;
        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const users = JSON.parse(await loadFile('users.json'));
        const newUser = {
            id: generateUniqueId(users, usersNextId),
            first_name,
            last_name,
            email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        users.push(newUser);
        await writeToFile("users.json", users);
        res.status(201).json(newUser);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/users/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id) || null;
        if (!id) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const { first_name, last_name, email } = req.body;
        const users = JSON.parse(await loadFile('users.json'));
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        const updatedUser = {
            ...users[userIndex],
            first_name: first_name || users[userIndex].first_name,
            last_name: last_name || users[userIndex].last_name,
            email: email || users[userIndex].email,
            updated_at: new Date().toISOString()
        };
        users[userIndex] = updatedUser;
        await writeToFile("users.json", users);
        res.json(updatedUser);
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

function generateUniqueId(data, nextId) {
    if (data.length === 0) {
        return nextId;
    }

    const maxId = Math.max(...data.map(item => item.id));
    nextId = Math.max(nextId, maxId + 1);
    return nextId;
}
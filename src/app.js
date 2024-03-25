const express = require('express');
const tasksRoutes = require('./tasks/tasks.routes');
const usersRoutes = require('./users/users.routes');


const app = express();

app.use(express.json());

app.use('/api/tasks', tasksRoutes);
app.use('/api/users', usersRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


function generateUniqueId(data, nextId) {
    if (data.length === 0) {
        return nextId;
    }

    const maxId = Math.max(...data.map(item => item.id));
    nextId = Math.max(nextId, maxId + 1);
    return nextId;
}
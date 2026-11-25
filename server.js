const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

const loginRoutes = require('./routes/login')
app.use('/auth', loginRoutes);
const registerRoutes = require('./routes/register');
app.use('/auth', registerRoutes);
const groupsRoutes = require('./routes/groups');
app.use('/groups', groupsRoutes);
const tasksRoutes = require('./routes/tasks');
app.use('/tasks', tasksRoutes);

app.listen(port, () => {
    console.log('Server running!');
});
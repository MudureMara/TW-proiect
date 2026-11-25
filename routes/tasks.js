const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const tasksFilePath = path.join(__dirname, '../data/tasks.json');
const membersFilePath = path.join(__dirname, '../data/group_members.json');
const verifyToken = require('./requireAuth');

router.put('/:id/status', verifyToken, (req, res) => {
    try {
        const taskID = parseInt(req.params.id);
        const { status, title, description, priority, due_date, assigned_to } = req.body;
        const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
        const taskIndex = tasks.findIndex(t => t.id === taskID);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Sarcina nu a fost gasita!' });
        }

        const task = tasks[taskIndex];
        tasks[taskIndex] = {
            ...task,
            status: status !== undefined ? status : task.status,
            title: title !== undefined ? title.trim() : task.title,
            description: description !== undefined ? priority : task.priority,
            due_date: due_date !== undefined ? due_date : task.due_date,
            assigned_to: assigned_to !== undefined ? (assigned_to ? parseInt(assigned_to) : null) : task.assigned_to,
            updated_at: new Date().toISOString()
        };
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

        return res.status(200).json({
            message: 'Sarcina a fost actualizata cu succes!',
            task: tasks[taskIndex]
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la actualizarea statusului sarcinii!' });
    }
});

router.delete('/:id', verifyToken, (req, res) => {
    try {
        const taskID = parseInt(req.params.id);
        const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
        const taskIndex = tasks.findIndex(t => t.id === taskID);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Sarcina nu a fost gasita!' });
        }
        tasks.splice(taskIndex, 1);
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
        return res.status(200).json({ message: 'Sarcina a fost stearsa cu succes!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la stergerea sarcinii!' });
    }
});

module.exports = router;
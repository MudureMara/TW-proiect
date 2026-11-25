const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const groupsFilePath = path.join(__dirname, '../data/groups.json');
const membersFilePath = path.join(__dirname, '../data/group_members.json');
const usersFilePath = path.join(__dirname, '../data/users.json');
const tasksFilePath = path.join(__dirname, '../data/tasks.json');
const notificationsFilePath = path.join(__dirname, '../data/notifications.json');
const verifyToken = require('./requireAuth');

router.post('/create-group', verifyToken, (req, res) => {
    try {
        const { group_name } = req.body;
        const generatedCode = generateCode();
        const groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf-8'));
        const members = JSON.parse(fs.readFileSync(membersFilePath, 'utf-8'));

        const newGroup = {
            id: groups.length + 1,
            group_name,
            group_code: generatedCode,
            created_by: req.user.id,
            created_at: new Date().toISOString()
        };
        groups.push(newGroup);
        fs.writeFileSync(groupsFilePath, JSON.stringify(groups, null, 2));

        const newMember = {
            id: members.length + 1,
            group_id: newGroup.id,
            user_id: req.user.id,
            role: 'admin',
            joined_at: new Date().toISOString()
        };
        members.push(newMember);
        fs.writeFileSync(membersFilePath, JSON.stringify(members, null, 2));

        return res.status(201).json({
            message: 'Grup creat cu succes!',
            group: newGroup
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la crearea grupului!'});
    }
});

const generateCode = () => {
    code = "";
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    return code;
}

router.get('/', verifyToken, (req, res) => {
    try {
        const groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf-8'));
        const members = JSON.parse(fs.readFileSync(membersFilePath, 'utf-8'));

        const filteredAfterUser = members.filter(m => m.user_id === req.user.id);
        const userGroups = filteredAfterUser.map(m => {
            const group = groups.find(g => g.id === m.group_id);
            return {
                id: group.id,
                group_name: group.group_name,
                group_code: group.group_code,
                role: m.role
            };
        });
        return res.status(200).json(userGroups);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la listarea grupurilor!' });
    }
});

router.post('/join', verifyToken, (req, res) => {
    try {
        const { group_code } = req.body;
        if (!group_code || group_code.trim() === '') {
            return res.status(400).json({ error: 'Codul grupului este obligatoriu!' });
        }

        const groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf-8'));
        const searchedGroup = groups.find(g => g.group_code === group_code.toUpperCase());
        if (!searchedGroup) {
            return res.status(404).json({ error: 'Nu exista niciun grup cu acest cod!' });
        }
        
        const members = JSON.parse(fs.readFileSync(membersFilePath, 'utf-8'));
        const existingMember = members.find(m => m.group_id === searchedGroup.id && m.user_id === req.user.id);
        if (existingMember) {
            return res.status(409).json({ error: 'Esti deja membru in acest grup!' });
        }
        const newMember = {
                id: members.length + 1,
                group_id: searchedGroup.id,
                user_id: req.user.id,
                role: 'member',
                joined_at: new Date().toISOString()
        };
        members.push(newMember);
        fs.writeFileSync(membersFilePath, JSON.stringify(members, null, 2));
        
        return res.status(201).json({
            message: 'Alaturare la grup cu succes!',
            group: searchedGroup
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Eroare la alaturarea grupului!' });
    }
});

router.get('/:groupID/members', verifyToken, (req, res) => {
    try {
        const groupID = parseInt(req.params.groupID);
        const groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf-8'));
        const members = JSON.parse(fs.readFileSync(membersFilePath, 'utf-8'));
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const group = groups.find(g => g.id === groupID);
        if (!group) {
            return res.status(404).json({ error: 'Grup negasit!' });
        }

        const isMember = members.some(m => m.group_id === groupID && m.user_id === req.user.id);
        if (!isMember) {
            return res.status(403).json({ error: 'Nu faci parte din acest grup!' });
        }

        const groupBelongings = members.filter(m => m.group_id === groupID);
        const detailedMembers = groupBelongings.map(belonging => {
            const user = users.find(u => u.id === belonging.user_id);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: belonging.role,
                joined_at: belonging.joined_at
            };
        });
        return res.status(200).json(detailedMembers);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la incarcarea membrilor grupului!' });
    }
});

router.get('/:groupID/tasks', verifyToken, (req, res) => {
    try {
        const groupID = parseInt(req.params.groupID);
        const groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf-8'));
        const members = JSON.parse(fs.readFileSync(membersFilePath, 'utf-8'));
        const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const group = groups.find(g => g.id === groupID)
        if (!group) {
            return res.status(404).json({ error: 'Grup negasit!' });
        }

        const isMember = members.some(m => m.group_id === groupID && m.user_id === req.user.id);
        if (!isMember) {
            return res.status(403).json({ error: 'Nu faci parte din acest grup!' });
        }

        const groupTasks = tasks
            .filter(t => t.group_id === groupID)
            .map(task => {
                const who = users.find(u => u.id === task.assigned_to);
                return {
                    ...task,
                    assigned_to_name: who ? who.name : null
                };
            });
        return res.status(200).json(groupTasks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la incarcarea sarcinilor din grup!' });
    }
});

// creearea unei sarcini + notificare membrii
router.post('/:groupID/tasks', verifyToken, (req, res) => {
    try {
        const groupID = parseInt(req.params.groupID);
        const { title, description, priority, due_date, assigned_to } = req.body;
        if (!title || title.trim() === '') {
            return res.status(400).json({ error: 'Titlul sarcinii este obligatoriu!' });
        }

        const groups = JSON.parse(fs.readFileSync(groupsFilePath, 'utf-8'));
        const members = JSON.parse(fs.readFileSync(membersFilePath, 'utf-8'));
        const tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
        const notifications = JSON.parse(fs.readFileSync(notificationsFilePath, 'utf-8'));

        const group = groups.find(g => g.id === groupID);
        if (!group) {
            return res.status(404).json({ error: 'Grup negasit!' });
        }

        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            group_id: groupID,
            title: title.trim(),
            description: description ? description.trim() : '',
            status: 'todo',
            priority: priority || 'medium',
            due_date: due_date || null,
            assigned_to: assigned_to ? parseInt(assigned_to) : null,
            created_by: req.user.id,
            created_at: new Date().toISOString()
        };
        tasks.push(newTask);
        fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

        // notificare pt ceilalti
        const others = members.filter(m => m.group_id === groupID && m.user_id !== req.user.id);
        const nextNotifID = notifications.length > 0 ? Math.max(...notifications,map(n => n.id)) + 1 : 1;
        others.forEach(member => {
            notifications.push({
                id: nextNotifID++,
                user_id: member.user_id,
                group_id: groupID,
                message: `Sarcina noua in "${group.group_name}": ${newTask.title}`,
                is_read: false,
                created_at: new Date().toISOString()
            });
        });
        fs.writeFileSync(notificationsFilePath, JSON.stringify(notifications, null, 2));
        
        return res.status(201).json({
            message: 'Sarcina creata si membrii notificati!',
            task: newTask
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Eroare la crearea sarcinilor din grup!' });
    }
});

module.exports = router;
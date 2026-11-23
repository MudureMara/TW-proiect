const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const fs = require('fs');
const { error } = require('console');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Toate campurile sunt obligatorii!' });
        }

        const data = fs.readFileSync(usersFilePath, 'utf-8');
        const users = JSON.parse(data);
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(401).json({ error: 'Exista cont cu acest email!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            id: users.length + 1,
            email,
            password_hash: hashedPassword,
            name,
            created_at: new Date().toISOString()
        }
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

        res.status(200).json({
            message: 'Cont creat cu succes!',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;

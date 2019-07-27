const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('../db');
const { User } = require('../models/user');

app.use(express.json());

let users = [
    {
        username: "shinrsssssaken",
        email: "peter.atkins85@gmail.com"
    },
    {
        username: "masterninja04",
        email: "bluemadness04@gmail.com"
    }
];

router.get('/', (req, res) => {
    res.json(users);
});

router.get('/create', (req, res) => {
    const user = new User({
        username: 'peter.atkins',
        firstName: 'Peter',
        lastName: 'Atkins',
        status: 'ACTIVE',
        email: 'peter.atkins85@gmail.com'
    });

    try {
        const result = user.save();
    }
    catch (ex) {
        console.log(ex.message);
    }

    res.send('User Created!');
});

router.get('/:id', (req, res) => {
    res.send('Hello Wordddld');
});

module.exports = router;
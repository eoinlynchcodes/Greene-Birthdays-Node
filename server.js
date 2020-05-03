require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

const Helpers = require('./Helpers');

const port = process.env.PORT || 3000;

var server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'World'}));
});

server.post('/register', (req, res) => {
    let user = req.body;
    const hashedpass = bcryptjs.hashSync(user.password, 12);
    user.password = hashedpass;
    Helpers.addUser(user)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.post('/login', (req, res) => {
    let { username, password } = req.body;
    Helpers.findUserBy({ username })
    .first()
    .then(user => {
        if( user && bcryptjs.compareSync(password, user.password)){
            res.status(200).json({ message: `Welcome ${user.username}`})
        } else {
            res.status(401).json({ message: 'Invalid credentials.'});
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.get('/getallfamily', (req, res) => {
    Helpers.findAllFamilyMembers()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.post('/addtofamily', (req, res) => {
    Helpers.addFamilyMember(req.body)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.listen(port, function () {
 console.log(`Example app listening on ${port}!`);
});

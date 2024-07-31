const express = require('express')
const app = express()
const cors = require('cors')
const port  = 3001
const {v4: uuidv4} = require('uuid')
app.use(express.json())
app.use(cors());
const users = []

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('usuário não encontrado');
    }
});

app.get('/users', (req, res) => {
    if(users.length > 0) res.json(users)
    else {
        res.status(404).send('A lista de usuários está vazia')
    }
})


app.post('/users', (req, res) => {
    const newUser = {
        id: uuidv4(),
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser).send('usuário criado com sucesso');
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
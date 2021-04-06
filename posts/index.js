const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const PORT = 4000;
const app = express();



const Posts = {};
app.use(bodyParser.json());
app.use(cors())


app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    Posts[id] = { id, title };
    await axios.post('http://eventbus-srv:5000/events', {
        type: 'CreatePost',
        payload: { id, title }
    })
    res.status(201).send(Posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Event Recieved', req.body);
})
app.listen(PORT, () => {
    console.log('Server started and listening on port ' + PORT)
})
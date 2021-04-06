const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const PORT = process.env.port || 5000;

app.use(bodyParser.json());
const events = [];

app.post('/events', (req, res) => {
    const evnt = req.body;
    events.push(evnt);
    axios.post('http://post-cluster-ip-srv:4000/events', req.body).catch(err => console.log(err.message));
    axios.post('http://comments-srv:4001/events', req.body).catch(err => console.log(err.message));
    axios.post('http://query-srv:4002/events', req.body).catch(err => console.log(err.message));
    axios.post('http://moderate-srv:4003/events', req.body).catch(err => console.log(err.message));


    res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
    console.log('called', events)
    res.send(events);
})
app.listen(PORT, () => {
    console.log('Event Bus is running on ' + PORT);
})
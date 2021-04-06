const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.port || 4003;


app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, payload } = req.body;

    if (type == 'CommentAdded') {
        const { id, postId, content } = payload;
        const status = content.includes('orange') ? 'Rejected' : 'Approved';
        await axios.post('http://eventbus-srv:5000/events', {
            type: 'CommentModerated',
            payload: {
                id,
                postId,
                content,
                status
            }
        });
    }
    res.send({});

});

app.listen(PORT, () => {
    console.log('Listening on ', PORT);
})
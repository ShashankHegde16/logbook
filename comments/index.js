const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');
const cors = require('cors');
const PORT = process.env.port || 4001;
const app = express();
app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'Pending' });
    commentsByPostId[req.params.id] = comments;
    await axios.post("http://eventbus-srv:5000/events", {
        type: 'CommentAdded',
        payload: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'Pending'
        }
    })
    res.status(201).send(comments)
});

app.post('/events', async (req, res) => {
    const { type, payload } = req.body

    if (type == 'CommentModerated') {
        const { id, postId, status, content } = payload;
        const comments = commentsByPostId[postId];
        const comment = comments.find(el => el.id == id);
        comment.status = status;
        await axios.post('http://eventbus-srv:5000/events', {
            type: 'CommentUpdated',
            payload: {
                id,
                postId,
                status,
                content
            }
        });
    }


})

app.listen(PORT, () => {
    console.log('Comment service running on ', PORT)
})
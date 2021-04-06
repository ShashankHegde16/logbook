const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');
const PORT = process.env.port || 4002;
const app = express();
const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, payload } = req.body;
    eventHandler(type, payload);

    res.send({})

})

const eventHandler = (type, payload) => {
    if (type == 'CreatePost') {
        const { id, title } = payload;
        posts[id] = { id, title, comments: [] }
    }
    if (type == 'CommentAdded') {
        const { id, content, postId, status } = payload;
        const post = posts[postId];
        post.comments.push({ id, content, status })
    }

    if (type == 'CommentUpdated') {
        const { id, content, postId, status } = payload;
        const post = posts[postId];
        const comment = post.comments.find(el => el.id == id);
        comment.status = status;
        comment.content = content;
    }
}

app.listen(PORT, async () => {
    const res = await axios.get('http://eventbus-srv:5000/events');
    for (let evt of res.data) {
        console.log(evt)
        eventHandler(evt.type, evt.payload);
    }
})

// minikube start --vm=true

// minikube start --driver=hyperkit

// minikube start --driver=virtualbox
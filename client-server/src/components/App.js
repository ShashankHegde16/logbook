import React from 'react';
import PostCreate from './PostCreate';
import PostLists from './PostLists'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Create Post</h3>
                <PostCreate />
                <hr></hr>
                <h1>Posts</h1>
                <PostLists />
            </div>
        );
    }
}

export default App;
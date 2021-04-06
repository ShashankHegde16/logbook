import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';


const PostLists = () => {
    const [posts, setPosts] = useState({});

    const renderPosts = () => {
        return Object.values(posts).map(el => {
            return (
                <div key={el.id} className="card" style={{ width: "25%", marginBottom: "20px" }}>
                    <div className="card-body">
                        <h3>{el.title}</h3>
                        <CommentList comments={el.comments} />
                        <CommentCreate id={el.id} />
                    </div>
                </div>
            )
        })
    }
    const fetchPosts = async () => {
        const response = await axios.get('http://post.com/posts');
        setPosts(response.data);
    }

    useEffect(() => {
        fetchPosts();
    }, []); // run only once

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts()}
        </div>
    )
}

export default PostLists;
import React, { useState } from 'react';
import axios from 'axios';


const CommentCreate = ({ id }) => {
    const [content, setContent] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post(`http://post.com/posts/${id}/comments`, { content });
        setContent('');
    }

    return (
        <div>
            <form >
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        className="form-control"
                        onChange={(e) => setContent(e.target.value)} />
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={onSubmit}>Submit</button>
            </form>
        </div>);

}

export default CommentCreate;
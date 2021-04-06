import React, { useState } from 'react';
import axios from 'axios';


const PostCreate = (props) => {
    const [title, setTitle] = useState('');
    const onSubmit = async (event) => {

        event.preventDefault();
        const response = await axios.post('http://post.com/posts/create', { title });
        setTitle('');
    }

    return (
        <div>
            <form >
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        className="form-control"
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={onSubmit}>Submit</button>
            </form>
        </div>);

}

export default PostCreate;
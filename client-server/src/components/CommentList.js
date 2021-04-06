import React from 'react';


const CommentList = ({ comments }) => {

    const renderComments = () => {
        let content;
        return comments.map(el => {

            if (el.status == 'Approved')
                content = el.content;

            if (el.status == 'Rejected')
                content = "This comment has been Rejected"

            return (<li key={el.id}>{content}</li>);
        })
    }
    return (<div >
        {renderComments()}
    </div>
    )
}

export default CommentList;
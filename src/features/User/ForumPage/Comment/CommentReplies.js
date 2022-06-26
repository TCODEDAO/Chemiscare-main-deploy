import React, { useCallback, useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import CommentControl from './CommentControl'

function CommentReplies({ comment, socket, currentUser }) {


    return (
        <>

            {comment.reply.map((reply, index) => {
                return (<div key={index}>
                    <CommentCard comment={reply}  >
                        <CommentControl comment={reply} socket={socket} idReply={comment} currentUser={currentUser} isRootComment={false} />
                    </CommentCard>
                </div>
                )
            })}</>
    )
}

export default CommentReplies
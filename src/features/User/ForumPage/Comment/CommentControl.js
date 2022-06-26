import React, { memo, useCallback, useState } from 'react'
import CreateCommentComponent from '../CreateData/CreateCommentComponent'


function CommentControl({ comment, currentUser, socket, idReply, postAuthorId, isRootComment, isBestAnswerHave }) {

    const [reply, setReply] = useState(false)


    return (
        <div>
            <div className="flex items-center">
                <p className="cursor-pointer hover:text-[#d54253] opacity-[0.9] text-white ">{comment?.isBestAnswer === true && <span className=' font-bold text-[#4cdc7e]'>Câu trả lời được chọn !</span>} </p>
                {((currentUser?._id === postAuthorId || currentUser?.isAdmin === true) && isRootComment && isBestAnswerHave === false) && <p className='mx-4 font-semibold hover:underline text-[white] cursor-pointer block' onClick={() => {
                    socket.emit('SetToChooseAnswer', comment._id)
                }}>Đặt làm câu trả lời được chọn</p>}
                {comment?.isBestAnswer === true && <i className="opacity-[0.9] fa-solid fa-circle text-[4px] mx-[8px] text-white "></i>}
                <p className="cursor-pointer hover:text-[#d54253] opacity-[0.9] text-white pr-3 " onClick={() => {
                    setReply(true)
                }}>Trả lời</p>





            </div>
            {reply && <CreateCommentComponent currentUser={currentUser} socket={socket} postId={idReply || comment?._id} DefaultReply={comment?.userId?.fullName} setReply={setReply} send="replyComment" createdAt={new Date().toISOString()} />}
        </div>
    )
}

export default CommentControl
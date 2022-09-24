import React, { memo, useEffect, useState } from 'react'
import { notifyInfo } from '../../../../components/Alert/AlertComponent'
import Avatar from '../../../../components/Avatar/AvatarComponent'

function CreateCommentComponent({ currentUser, postId, socket, DefaultReply, setReply, send, createdAt }) {

    const [contentComment, setContentComment] = useState('')
    useEffect(() => {
        if (DefaultReply) {
            setContentComment(`${DefaultReply && DefaultReply}:  `)
        }
    }, [])
   
    const handleSendComment = () => {
        if(!currentUser){
            notifyInfo('Bạn cần đăng nhập để tiếp tục bình luận!')
            return
        }

        const data = {
            userId: currentUser?._id,
            postId: postId,
            content: contentComment,
            createdAt: createdAt

        }
        if (contentComment === '') {
            notifyInfo('Bạn cần thêm thông tin cho bình luận!')
         return
        }
        if (contentComment.length < 20) {
            notifyInfo('Bình luận của bạn quá ngắn!')
return
        }

        socket.emit('CreateCommentFromClient', { data: data, send: send })
        setContentComment('')
        if (setReply) {

            setReply(false)
        }
    }
    
    return (
        <div className="mb-[10px] min-w-[100px]">
            <div className="flex items-end mb-[8px]">
                <div className="mr-[8px]">
                    {currentUser?.avatar ? <img className="w-[40px] h-[40px] object-cover rounded-[50%]"
                        src={currentUser?.avatar}
                        alt="" /> : <Avatar name={currentUser?.fullName || 'Guest'}
                            size="40px" />}
                </div>
                <div className="grow">
                    <input
                        className="w-full text-white font-light bg-[transparent] py-[8px] outline-none border-solid border-[#2a2c34] border-b-[1.4px]"
                        type="text" placeholder="Viết bình luận của bạn..." value={contentComment} onChange={e => setContentComment(e.target.value)} />
                </div>
            </div>
            <div className="flex justify-end">
                <span className="px-[20px] py-[8px] font-medium cursor-pointer text-white" onClick={() => {
                    if (setReply) {

                        setReply(false)
                    }
                }}>HỦY</span>
                <span
                    className="px-[20px] py-[8px] text-white font-medium bg-[#ccc] cursor-pointer rounded-[20px]" onClick={()=>handleSendComment()}>BÌNH
                    LUẬN</span>
            </div>
        </div>
    )
}

export default memo(CreateCommentComponent)
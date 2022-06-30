import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getPostById } from '../../../../api/User/apiPost'
import Avatar from '../../../../components/Avatar/AvatarComponent'
import { addOneComment, setComments } from '../../../../redux/User/ReactionSlice'
import { createAxios } from '../../../../utils/axiosJWT'

import loadingGif from '../../../../assets/images/gif/noBgLoad.gif'
import CommentControl from './CommentControl'
import CommentCard from './CommentCard'
import CommentReplies from './CommentReplies'





function CommentList({ postId, postAuthorId }) {
    const socket = useSelector(state => state?.socket?.socket)
    const dispatch = useDispatch()
    const comments = useSelector(state => state?.reaction?.comments)
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    let axiosJWT = createAxios(currentUser, dispatch)
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const pageEnd = useRef()

    useEffect(() => {
        socket.on('CreateCommentFromServerSuccess', data => {
            getPostById(currentUser, dispatch, axiosJWT, postId, navigate, page)
            dispatch(addOneComment(data))
        })
    }, [socket])

    useEffect(() => {
        setLoading(true)
        getPostById(currentUser, dispatch, axiosJWT, postId, navigate, page)
        setLoading(false)
    }, [postId, page])
    //infiniti scroll
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prev => prev + 1)
            }
        }, {
            threshold: 1.0
        })

        observer.observe(pageEnd.current)
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('CreateCommentReplyFromServerSuccess', msg => {

                getPostById(currentUser, dispatch, axiosJWT, postId, navigate, page)
            })
        }
        if (socket) {
            socket.on('SetToChooseAnswerFulfilled', msg => {
                getPostById(currentUser, dispatch, axiosJWT, postId, navigate, page)
            })
        }

    }, [socket])




    const isBestAnswerHave = comments.filter(comment => comment?.isBestAnswer === true).length > 0

    return (
        <ul className="">
            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment}>


                    <CommentControl comment={comment} socket={socket} idReply={comment} currentUser={currentUser} isBestAnswerHave={isBestAnswerHave.current} postAuthorId={postAuthorId} isRootComment={true} />

                    <div className='replyComment'>

                        <CommentReplies comment={comment} socket={socket} currentUser={currentUser} />
                    </div>
                </CommentCard>
            ))}
            {/* <li className="flex my-[20px]">
                <div className="mr-[8px]">
                    <img className="w-[36px] h-[36px] object-cover rounded-[50%]"
                        src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                </div>
                <div className="maxWidthClassName">
                    <div className="bg-[#353945] px-[12px] py-[10px] rounded-[16px] mb-[8px]">
                        <p className="font-medium mb-[4px] text-white ">Nguyễn Phúc Thanh</p>
                        <p className="font-light break-words text-white ">Hay lắm bạn bạn bạn bạn bạn bạn bạnHay lắm
                            bạn bạn bạn bạn bạn bạn bạnHay lắm bạn bạn bạn bạn bạn bạn bạn!!!</p>
                    </div>
                    <div className="flex items-center text-[14px] justify-between mb-[8px]">
                        <div className="flex items-center">
                            <p className="cursor-pointer hover:text-[#d54253] opacity-[0.9] text-white ">Thích</p>
                            <i className="opacity-[0.9] fa-solid fa-circle text-[4px] mx-[8px] text-white "></i>
                            <p className="cursor-pointer hover:text-[#d54253] opacity-[0.9] text-white ">Trả lời</p>
                        </div>
                        <p className="opacity-[0.9] font-light text-white">15 phút trước</p>
                    </div>

                     <div>
                        <div className="flex items-center cursor-pointer mb-8px">
                            <p className="font-medium mr-[8px] text-white ">Xem 2 câu trả lời</p>
                            <i className="fa-solid fa-angle-down text-white "></i>
                        </div>
                        <ul className="">
                            <li className="flex my-[20px]">
                                <div className="mr-[8px]">
                                    <img className="w-[36px] h-[36px] object-cover rounded-[50%]"
                                        src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                        alt="" />
                                </div>
                                <div className="maxWidthClassName">
                                    <div className="bg-[#353945] px-[12px] py-[10px] rounded-[16px] mb-[8px]">
                                        <p className="font-medium mb-[4px]">Nguyễn Phúc Thanh</p>
                                        <p className="font-light break-words">Hay lắm bạn bạn bạn bạn bạn bạn bạnHay lắm
                                            bạn bạn bạn bạn bạn bạn bạnHay lắm bạn bạn bạn bạn bạn bạn bạn!!!</p>
                                    </div>
                                    <div className="flex items-center text-[14px] justify-between mb-[8px]">
                                        <div className="flex items-center">
                                            <p className="cursor-pointer hover:text-[#d54253] opacity-[0.9]">Thích</p>
                                            <i className="opacity-[0.9] fa-solid fa-circle text-[4px] mx-[8px]"></i>
                                            <p className="cursor-pointer hover:text-[#d54253] opacity-[0.9]">Trả lời</p>
                                        </div>
                                        <p className="opacity-[0.9] font-light">15 phút trước</p>
                                    </div>
                                    <div className="my-[12px] hidden">
                                        <div className="flex items-end mb-[8px]">
                                            <div className="mr-[8px]">
                                                <img className="w-[40px] h-[40px] object-cover rounded-[50%]"
                                                    src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                                    alt="" />
                                            </div>
                                            <div className="grow">
                                                <input
                                                    className="w-full font-light bg-[transparent] py-[8px] outline-none border-solid border-[#2a2c34] border-b-[1.4px]"
                                                    type="text" placeholder="Viết bình luận của bạn..." />
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <span className="px-[20px] py-[8px] font-medium cursor-pointer">HỦY</span>
                                            <span
                                                className="px-[20px] py-[8px] font-medium bg-[#ccc] cursor-pointer rounded-[20px]">TRẢ LỜI</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center cursor-pointer mb-8px">
                                            <p className="font-medium mr-[8px]">Xem 2 câu trả lời</p>
                                            <i className="fa-solid fa-angle-down"></i>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </ul>
                    </div> 
                </div>
            </li> */}
            {loading && <div className='flex justify-center items-center'><img src={loadingGif} alt="" width="20%" /></div>}
            <button ref={pageEnd} className="opacity-0 invisible">Load more</button>
        </ul>
    )
}

export default CommentList
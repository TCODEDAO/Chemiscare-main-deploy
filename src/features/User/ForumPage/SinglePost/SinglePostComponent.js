import moment from 'moment';
import React, { useState } from 'react'
import { useRef } from 'react';
import { lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../../../../api/User/apiPost';
import 'moment/locale/vi'
import './SinglePostComponent.css'
import Avatar from '../../../../components/Avatar/AvatarComponent';
import xss from 'xss'
import CreateCommentComponent from '../CreateData/CreateCommentComponent';
import CommentList from '../Comment/CommentList';
import loadingGif from '../../../../assets/images/gif/noBgLoad.gif'

import {toHex} from 'base64-mongo-id'
moment.locale('vi')
const Navigation = lazy(() => import('../../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../../components/Footer/FooterComponent'))
function SinglePostComponent() {
    const { postSlug } = useParams()
    const postId =toHex(postSlug.split('-')[postSlug.split('-').length-1])
    

    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    const socket = useSelector(state => state?.socket?.socket)
   
    useEffect(() => {
        setLoading(true)
        getPostById( dispatch, postId, navigate)
        setLoading(false)
    }, [dispatch,navigate,postId])

    const post = useSelector(state => state?.post?.posts?.filter(post => post._id === postId))


    //ref
    const contentWrapperRef = useRef(null)
    const partLeft = useRef(null)
    const partRight = useRef(null)
    const comment_Wrapper = useRef(null)




    if (document.querySelectorAll('.post_Reaction')) {
        document.querySelectorAll('.post_Reaction').forEach(function (post_Reaction, index) {
            post_Reaction.addEventListener('click', function () {
                document.querySelectorAll('.post_Reaction__active')[index].style.display = 'inline';
                post_Reaction.style.display = 'none'
            })
        })
    }

    if (document.querySelectorAll('.post_Reaction__active')) {
        document.querySelectorAll('.post_Reaction__active').forEach(function (post_Reaction__active, index) {
            post_Reaction__active.addEventListener('click', function () {
                document.querySelectorAll('.post_Reaction')[index].style.display = 'inline';
                post_Reaction__active.style.display = 'none'
            })
        })
    }

    //comment
    const commentCount = useSelector(state => state?.reaction?.count?.comments)
    useEffect(() => {


        partLeft.current.style.marginLeft = `233px`
    }, [partLeft, contentWrapperRef, comment_Wrapper])

    return (

        <div className="pt-[100px] pb-[80px] bg-[#13161B] relative min-h-[100vh] content_Wrapper " ref={el => contentWrapperRef.current = el}>
            <Navigation currentUser={currentUser} />
            <div className="max-w-[1092px] w-[100%] mx-auto mt-[20px] flex bodyWrapper">
                <div className="w-[20%] fixed partRight" ref={el => partRight.current = el}>
                    <div className="mx-[48px]">
                        <p className="text-[18px] font-medium text-center text-[#fff]">{post[0]?.userId.fullName}</p>
                        <hr className="h-[1px] bg-[#2a2c34] mt-[10px] mb-[24px]" />
                        <div className="flex justify-around">

                            <span className="flex flex-col items-center cursor-pointer text-[#fff]">
                                <i className="text-[20px] mb-[4px] fa-regular fa-comment comment_Icon__open" onClick={() => {
                                    if (socket) {

                                        socket.emit('join_room_comment', postId)
                                    }
                                    comment_Wrapper.current.style.display = 'block'
                                }}></i>
                                {commentCount}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-[60%] partLeft" ref={el => partLeft.current = el}>
                    <div>
                        <p className="font-bold text-[40px] mt-[-10px] postTitle text-[#fff]">{post[0]?.title}</p>
                        <div className="my-[20px] flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="mr-[4px]">
                                    {post[0]?.userId?.avatar ? <img className="w-[50px] h-[50px] object-cover rounded-[50%]"
                                        src={post[0]?.userId?.avatar}
                                        alt="" /> : <Avatar name={post[0]?.userId.fullName?.split(' ')[post[0]?.userId?.fullName?.split(' ').length -1]}
                                            size="50px" />}
                                </div>
                                <div>
                                    <p className='text-white'>{post[0]?.userId.fullName}</p>
                                    <div className="flex items-center">
                                        <p className="text-white opacity-[0.9] font-light text-[14px]">{moment(post[0]?.createdAt).fromNow()}</p>
                                        {/* <i className="opacity-[0.9] fa-solid fa-circle text-[4px] mx-[8px]"></i>
                                        <p className="opacity-[0.9] font-light text-[14px]">5 phút đọc</p> */}
                                    </div>
                                </div>
                                {/* {console.log(post[0]?.content)}
                                <div dangerouslySetInnerHTML={{ __html: xss(post[0]?.content) }} className="overflow-scroll">

                                </div> */}
                            </div>
                            <div>
                                <i className="cursor-pointer fa-regular fa-bookmark mr-[8px] post_Reaction text-white"></i>
                                <i className="cursor-pointer fa-solid fa-bookmark mr-[8px] text-[#d54253] post_Reaction__active text-white" style={{ display: "none" }}></i>
                                <i className="cursor-pointer fa-solid fa-ellipsis text-white"></i>
                            </div>

                        </div>
                        <div className='text-white'>
                            <div dangerouslySetInnerHTML={{ __html: xss(post[0]?.content) }}></div>
                        </div>
                    </div>
                </div>
                <div className="fixed w-[100%] top-0 bottom-0 z-10 right-0 bg-[rgba(0,0,0,0.2)] comment_Wrapper hidden" ref={el => comment_Wrapper.current = el}>
                    <div className="comment_Content w-[50%] bg-[rgb(30,32,41)] absolute right-0 top-0 bottom-0 pt-[50px] pb-[60px] px-[40px] overflow-y-auto">
                        <div className="w-full text-right">
                            <i className="comment_Icon__close text-white fa-solid fa-xmark text-[24px] cursor-pointer py-[10px] pl-[10px]" onClick={() => {
                                comment_Wrapper.current.style.display = 'none'
                            }}></i>
                        </div>
                        <div>
                            <p className="text-[20px] font-medium mb-[40px] text-white">{commentCount} bình luận</p>
                            <div className="">
                                <CreateCommentComponent currentUser={currentUser} postId={postId} socket={socket} />
                                <CommentList postId={postId} postAuthorId={post[0]?.userId?._id} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {loading && <div className='flex justify-center items-center'><img src={loadingGif} alt="" width="20%" /></div>}
        </div>
    )
}

export default SinglePostComponent
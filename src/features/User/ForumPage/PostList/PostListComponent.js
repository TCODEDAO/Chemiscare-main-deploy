import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminDeletePost, getAllPost, getAllPostApproved } from '../../../../api/User/apiPost'
import { createAxios } from '../../../../utils/axiosJWT'
import moment from 'moment'
import 'moment/locale/vi'
import xss from 'xss'
import { Link } from 'react-router-dom'



moment.locale('vi')
const loadAnimate = require('../../../../assets/images/gif/noBgLoad.gif')
const PostExcerpt = ({ post, currentUser, socket, axiosJWT }) => {

    const [showBox, setShowBox] = useState(false)
    return (
        <li className="my-[8px] list-none w-[100%] rounded-[16px] p-[24px] border-solid border-[#2a2c34] border-[1px] bg-[#1e2029]" onClick={(e) => {
            e.stopPropagation()
            setShowBox(false)

        }}>
            <div className="flex justify-between">
                <div className="flex items-center cursor-pointer">
                    <div className="mr-[4px]">
                        <img className="w-[28px] h-[28px] object-cover rounded-[50%]" src={post?.userId?.avatar} alt="" />
                    </div>
                    <p className="font-medium p-white-forum text-white hover:text-[#d54253] ml-2">{post?.userId?.fullName}</p>
                </div>
                <div>
                    {/* <i className="cursor-pointer fa-regular fa-bookmark  p-white-forum mr-[8px]"></i> */}
                    {/* <i className="cursor-pointer fa-solid fa-bookmark  p-white-forum mr-[8px] text-[#d54253]" style={{ display: 'none' }}></i> */}
                    {(currentUser?.isAdmin || currentUser?._id === post?._id) && <i className="cursor-pointer fa-solid fa-ellipsis hover:text-[#d54253] p-white-forum" onClick={(e) => {

                        e.stopPropagation()
                        setShowBox(!showBox)
                    }}></i>}
                    {showBox && <div>
                        <ul className='min-w-[100px] p-2 bg-[#757575] left-[50%] translate-x-[-50%] rounded-xl z-[9999] absolute '>
                            <li className='text-[#ffffffde] p-2 text-center cursor-pointer select-none hover:bg-[#cccccc4f] rounded-xl ' onClick={() => {
                                adminDeletePost(currentUser, axiosJWT, post?._id, socket)
                            }}>X??a</li>
                        </ul>
                    </div>}

                </div>
            </div>
            <div className="mt-[8px] mb-[16px]">
                <div>
                    <Link to={`/forum/post/${post?._id}`}><p className="text-[20px] text-white p-white-forum font-[700] hover:text-[#d54253] cursor-pointer">{post?.title}</p></Link>
                    <Link to={`/forum/post/${post?._id}`}><p className="mt-[4px] text-white p-white-forum leading-[1.6] text-[15px] font-light" dangerouslySetInnerHTML={{ __html: xss(post?.content?.slice(0, 100)) }}></p></Link>
                </div>
            </div>
            <div className="flex items-center">
                <p className=" text-white p-white-forum">{moment(post?.createdAt).fromNow()}</p>
                <i className="text-white fa-solid fa-circle text-[4px]  p-white-forum mx-[8px]"></i>

            </div>
        </li>
    )
}


export default function PostListComponent({ filter }) {
    const socket = useSelector(state => state?.socket?.socket)

    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    const postList = useSelector(state => {
        if (filter) {
            return state?.post?.posts.filter(state => state?.userId?._id === filter)
        } else {
            return state?.post?.posts
        }
    })

    const dispatch = useDispatch()
    let axiosJWT = createAxios(currentUser, dispatch)
    useEffect(() => {
        if (currentUser) {
            getAllPostApproved(currentUser, dispatch, axiosJWT)
        }
        if (socket) {
            socket.on('ApprovedSuccessPostAdminFromServer', data => {
                getAllPostApproved(currentUser, dispatch, axiosJWT)
            })
        }
        if (socket) {
            socket.on('RemoveSuccessPostAdminFromClientFromServer', data => {
                getAllPostApproved(currentUser, dispatch, axiosJWT)
            })
        }
        if (socket) {
            socket.on('RemoveSuccessPostAdminRealFromServer', data => {
                getAllPostApproved(currentUser, dispatch, axiosJWT)

            })
        }

        return () => {
            if (socket) {
                socket.off('RemoveSuccessPostAdminFromClientFromServer', data => {
                    getAllPostApproved(currentUser, dispatch, axiosJWT)
                })
            }
            if (socket) {
                socket.off('ApprovedSuccessPostAdminFromServer', data => {
                    getAllPostApproved(currentUser, dispatch, axiosJWT)
                })
            }
        }
    }, [])

    const postStatus = useSelector(state => state.post.status)


    let content
    if (postStatus === 'loading') {

        content = <div className='flex justify-center items-baseline'>   <img src={loadAnimate} width="80" alt="" /></div>
    } else if (postStatus === 'success') {
        content = postList.map((post, index) => (
            <PostExcerpt post={post} key={index} currentUser={currentUser} socket={socket} axiosJWT={axiosJWT} />
        ))
    } else if (postStatus === 'failed') {
        content = <div className='text-white' onLoad={() => {
            window.location.reload()
        }}>L???y b??i vi???t kh??ng th??nh c??ng!</div>
    }

    return (
        <>
            {content}
        </>
    )
}

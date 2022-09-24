import React, { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminAprrovedPost, adminAprrovedThread, adminDeletePost, adminDeletePostReal, adminDeleteThread, adminDeleteThreadReal, getAllPost, getAllThread, getAllThreadApproved } from '../../../api/User/apiPost'
import { notifyErorr, notifyInfo } from '../../../components/Alert/AlertComponent'
import { addPostRealtime, adminGetPostsSuccess } from '../../../redux/Admin/ForumManagementSlice'
import { createAxios } from '../../../utils/axiosJWT'


//xss
import xss from 'xss'
//style
import Avatar from '../../../components/Avatar/AvatarComponent'
import './CensorPost.css'
import { checkIsAdmin } from '../../../api/User/apiAuth'

const Navigation = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
function CensorPost() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)
    const threads = useSelector(state => state?.post?.thread?.content)
    const threadListNotAprroved = useSelector(state => state?.forumManagementSlice?.threads)
    const postsListNotApproved = useSelector(state => state?.forumManagementSlice?.posts)

    const socket = useSelector(state => state?.socket?.socket)

    const axiosJWT = createAxios(currentUser, dispatch)

    useEffect(async () => {
        if (!currentUser) {
            navigate('/auth')
        }


        if (currentUser) {
            const isAdmin =await checkIsAdmin(currentUser,dispatch)

            if (isAdmin === false) {

                navigate('/learn')
                notifyInfo('Bạn không có quyền truy cập!')
            }
            getAllThreadApproved(dispatch)
            getAllThread(currentUser, dispatch, axiosJWT)
            getAllPost(currentUser, dispatch, axiosJWT)
        }
    }, [])

    useEffect(() => {

        if (socket) {

            socket.on('createNewThreadSuccessAdmin', msg => {
                getAllThread(currentUser, dispatch, axiosJWT)
            })
            socket.on('CreateThreadAndSendToAdminFromServer', data => {
                dispatch(addPostRealtime(data))
                getAllPost(currentUser, dispatch, axiosJWT)
            })
            socket.on('ApprovedSuccessPostAdminFromServer', data => {
                getAllPost(currentUser, dispatch, axiosJWT)
            })
        }

    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('RemoveSuccessThreadAdminRealSuccess', msg => {
                getAllThread(currentUser, dispatch, axiosJWT)
                getAllThreadApproved(dispatch)
            })
        }
        if (socket) {
            socket.on('RemoveSuccessPostAdminFromClientFromServer', data => {
                getAllPost(currentUser, dispatch, axiosJWT)
            })
        }
        if (socket) {
            socket.on('RemoveSuccessPostAdminRealFromServer', data => {
                getAllPost(currentUser, dispatch, axiosJWT)

            })
        }

    }, [socket])
    return (
        <>
            <div className="pt-[130px] pb-[90px] bg-[#13161B] relative min-h-[100vh] contentWrapper">
                <Navigation currentUser={currentUser} />

                <div className="max-w-[1092px] w-[100%] mx-auto flex flex-col items-center bodyWrapper">
                    <div className="w-[100%] text-left mb-[60px] text-white">
                        <p className="font-[900] text-[38px] text-white">Bài viết nổi bật</p>
                        <p>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học hóa, cảm xúc trong quá trình học.</p>
                    </div>
                    <div className="w-full flex">
                        <ul className="flex flex-col justify-start w-[60%]">

                            {postsListNotApproved?.map(post => (
                                <li key={post._id} className="my-[8px] w-[100%] rounded-[16px] p-[24px] border-solid border-[#2a2c34] border-[1px] bg-[#1e2029]">
                                    <div className="flex justify-between">
                                        <div className="flex items-center cursor-pointer">
                                            <div className="mr-[4px]">
                                            {post?.userId?.avatar ? <img className="w-[28px] h-[28px] object-cover rounded-[50%]" src={post?.userId?.avatar} alt="" /> :  
                                            <Avatar
                                                size="50px"
                                                round="50%"
                                                textSizeRatio={1.75}
                                                name={post?.userId?.fullName?.split(' ')[post?.userId?.fullName?.split(' ').length -1]}
                                            ></Avatar>}
                                            </div>
                                            <p className="font-medium hover:text-[#d54253] text-white">{post?.userId?.fullName}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mx-[14px] font-semibold cursor-pointer text-white" onClick={() => {
                                                adminDeletePostReal(currentUser, axiosJWT, post._id, socket)
                                                getAllPost(currentUser, dispatch, axiosJWT)
                                            }}>Xóa</span>
                                            <hr className="border-[#2a2c34] border-[1px] border-solid h-[16px] w-[1px] bg-[#2a2c34]" />
                                            <span className="mx-[14px] font-semibold mr-0 text-[#d54253] cursor-pointer" onClick={() => {
                                                adminAprrovedPost(currentUser, axiosJWT, post._id, socket)
                                                getAllPost(currentUser, dispatch, axiosJWT)
                                            }}>Duyệt</span>
                                        </div>
                                    </div>
                                    <div className="mt-[16px] flex">
                                        <div>
                                            <p className="text-[20px] font-[700] hover:text-[#d54253] text-white cursor-pointer" onClick={() => {
                                                navigate(`/forum/post/${post?._id}`)
                                            }}>{post?.title}</p>
                                            <p className="mt-[4px] leading-[1.6] text-[15px] text-white font-light" dangerouslySetInnerHTML={{ __html: xss(post?.content?.slice(0, 100)) }}></p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {threadListNotAprroved?.map(thread => (
                                <li key={thread._id}
                                    className="my-[8px] w-[100%] rounded-[16px] p-[24px] border-solid border-[#2a2c34] border-[1px] bg-[#1e2029]">
                                    <div className="flex justify-between">
                                        <div className="flex items-center cursor-pointer">
                                            <div className="mr-[4px]">
                                                <img className="w-[28px] h-[28px] object-cover rounded-[50%]"
                                                    src={thread?.userId?.avatar}
                                                    alt="" />
                                            </div>
                                            <p className="font-medium hover:text-[#d54253] text-white">{thread?.userId?.fullName}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span
                                                className="mx-[14px] select-none font-semibold cursor-pointer text-white hover:text-[#ffffff92]"
                                                onClick={() => {
                                                    adminDeleteThreadReal(currentUser, axiosJWT, thread._id, socket)
                                                }}

                                            >Xóa</span>
                                            <hr className="border-[#2a2c34] border-[1px] border-solid h-[16px] w-[1px] bg-[#2a2c34]" />
                                            <span
                                                className="mx-[14px] select-none font-semibold mr-0 text-[#d54253] cursor-pointer hover:text-[#d5425398]"
                                                onClick={() => {
                                                    adminAprrovedThread(currentUser, axiosJWT, thread._id, socket)
                                                    getAllThread(currentUser, dispatch, axiosJWT)
                                                    getAllThreadApproved(dispatch)
                                                }}
                                            >Duyệt
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-[16px] flex">
                                        <div>

                                            <p className="text-[20px] font-[700] hover:text-[#d54253] text-white cursor-pointer">Chủ đề</p>
                                            <p className="mt-[4px] leading-[1.6] text-[15px] text-white font-light select-none">{thread?.content}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="ml-[60px] w-[40%]">
                            <p className="mb-[12px] opacity-[0.9] text-white">CÁC CHỦ ĐỀ </p>
                            <div className="flex flex-wrap text-[#333] mx-[-8px]">
                                {threads?.map((thread) => (
                                    <div key={thread._id} className="bg-[#fafafa] select-none hover:bg-[#f2f2f2f2] text-[80%] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px] btn btn--action" onClick={() => {
                                        adminDeleteThread(currentUser, axiosJWT, thread._id, socket)
                                        getAllThread(currentUser, dispatch, axiosJWT)
                                        getAllThreadApproved(dispatch)
                                    }}><span onClick={() => {
                                        adminDeleteThread(currentUser, axiosJWT, thread._id, socket)
                                        getAllThread(currentUser, dispatch, axiosJWT)
                                        getAllThreadApproved(dispatch)
                                    }}>{thread.content}</span></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default CensorPost
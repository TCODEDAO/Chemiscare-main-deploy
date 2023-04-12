import React, { lazy, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import favicon from '../../../assets/images/icons/forumFavicon.ico'

import './ForumPage.css'


import { notifyErorr } from '../../../components/Alert/AlertComponent'
import CreateThreadComponent from './CreateData/CreateThreadComponent'
import { getAllThreadApproved, } from '../../../api/User/apiPost'
import { Helmet } from 'react-helmet'
import Tour from 'reactour'

const Header = lazy(() => import('../../../components/Header/HeaderComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
const Nav = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const PostList = lazy(() => import('./PostList/PostListComponent'))
export default function BlogComponent() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    const threads = useSelector(state => state?.post?.thread?.content)
    const socket = useSelector(state => state?.socket?.socket)
    const navigate = useNavigate()

    useEffect(() => {
        getAllThreadApproved(dispatch)
    }, [])

    //Toggle Editor
    const [isEditorShowThread, setIsEditorShowThread] = useState(false)
    const handleShowEditorThread = (e) => {

        setIsEditorShowThread(true)
    }
    const handleHideEditorThread = useCallback(() => {

        setIsEditorShowThread(false)

    }, [])


    //animate show thread
    useEffect(() => {
        if (socket) {
            socket.on('ApprovedSuccessThread', () => {

                getAllThreadApproved(dispatch)
            })
            socket.on('createNewThreadFailedAdmin', msg => {
                notifyErorr(msg.message)
            })

        }

        return () => {
            if (socket) {
                socket.off('ApprovedSuccessThread', () => {

                    getAllThreadApproved(dispatch)
                })
                socket.off('createNewThreadFailedAdmin', msg => {
                    notifyErorr(msg.message)
                })


            }

        }
    }, [socket])

    useEffect(() => {
        if (socket) {
            socket.on('RemoveSuccessThreadAdminRealSuccess', msg => {

                getAllThreadApproved(dispatch)
            })
        }

    }, [socket])


    const [isStepEnabled, setIsStepEnabled] = useState(false)

    const steps = [
        {
            selector: '',
            content: () => {
                return (
                    <div className='flex  items-center flex-col text-[14px]'>
                        <span className='text-black'>Chào mừng bạn đã đến với phần hướng dẫn nhanh của chúng tôi!</span>
                        {/* <button
                            style={{

                            }}
                            onClick={() => navigate('/help/usage')}
                        > */}
                        {/* <span className='hover:underline font-[10px] text-black'>Nếu bạn muốn biết thêm chi tiết về các tính năng, vui lòng bấm vào đây!{" "}</span> */}

                        {/* </button> */}
                    </div>)
            },
        },
        {
            selector: '.navigation-react-tour',
            content: 'Đây là thanh điều hướng của website, bạn có thể nhấn vào 1 trong các thành phần để chuyển hướng sang trang muốn sử dụng, nhấp vào hình đại diện để xem.',
        },
        {
            selector: '.header-react-tour',
            content: 'Đây là thanh tiêu đề website, bạn có thể đổi màu nền, tìm kiếm, xem xếp hạng bản thân tại đây.',
        },
        {
            selector: '.container-react-forum',
            content: 'Đây là thành phần chính trang bài viết của Chemiscare, bạn có thể thực hiện các thao tác đọc bài viết, tạo bài viết, bình luận về bài viết trong đây.',

        },
    ]
    const $ = document.querySelector.bind(document)

    const handleOpen = (elm, status) => {
        elm.classList.remove('hidden');
        elm.classList.add(status);
    }
    const handleClose = (elm, status) => {
        elm.classList.remove(status);
        elm.classList.add('hidden');
    }
    return (
        <>

            <Helmet>
                <link rel="shortcut icon" href={favicon} type="image/x-icon" />
                <title>Chia sẻ chemiscare</title>
                <meta name="description" content="Học tập hóa học thông qua các bài viết, cách cân bằng phương trình, tự học hóa học, cách học hóa học hiệu quả nhất, hóa học dễ hiểu, chemistry, learning chemistry at chemiscare" />
            </Helmet>
            <div className="">
                <Header currentUser={currentUser} />
                <Tour
                    className='h-[30%] w-[60%] flex justify-around flex-col items-center text-black-important'
                    steps={steps}
                    accentColor="#f05123"
                    rounded={6}
                    isOpen={isStepEnabled}
                    onRequestClose={() => {
                        setIsStepEnabled(false)
                    }}

                    badgeContent={(curr, tot) => `Bước ${curr} trên ${tot}`}
                    lastStepNextButton={"Xong"}
                    nextButton={"Tiếp tục"}
                    prevButton={"Quay lại"}
                    scrollDuration={100}


                />
                <div className="flex mt-[100px] w-[90%] mb-[8px]">
                    <Nav />
                    <div className="ml-[40px] w-full pb-[64px] container-react-forum">
                        <div className="mt-[32px]">
                            <div className="w-[100%] text-left mb-[60px]">
                                <p className="font-[900] text-[38px]">Bài viết nổi bật</p>
                                <p>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học hóa, cảm xúc trong quá trình học.</p>
                            </div>
                            <div className="w-full flex">
                                <ul className="flex flex-col justify-start w-[60%] listPost">
                                    <PostList />


                                </ul>
                                <div className="ml-[60px] w-[40%] suggestedTopic">
                                    <p className="mb-[12px] opacity-[0.9] m-[6px]">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</p>
                                    <div className="flex flex-wrap text-[#333]">

                                        {threads?.map((thread) => (
                                            <div key={thread._id} className="bg-[#fafafa] border-[1px] border-solid border-[#2b2c2d] hover:bg-[#f6f6f6] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px] post_suggested_topic">{thread.content}</div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed top-[40%] right-0 z-10">
                    <div className="tutorial_open_btn cursor-pointer"
                        onClick={(e) => {
                            if ($('.tutorial_start_wrapper').classList.contains('hidden')) {
                                handleOpen($('.tutorial_start_wrapper'), 'flex');
                                handleClose($('.tutorial_open_btn'), 'block');
                            }
                        }}
                    >
                        <div
                            className="bg-[#E0F2FE] text-[#1a1a1a] rotate-[-90deg] flex items-center px-[16px] py-[8px] rounded-tl-[8px] rounded-tr-[8px]"
                        >
                            <i className="fa-solid fa-circle-question mr-[8px]"></i>
                            <p className="font-semibold">Hướng dẫn</p>
                        </div>
                    </div>
                    <div
                        className="hidden absolute top-0 right-[100%] w-[240px] text-[#1a1a1a] bg-[#fff] items-center justify-center flex-col px-[32px] py-[32px] rounded-[16px] tutorial_start_wrapper">
                        <div className="absolute top-0 right-0 p-[16px] tutorial_start_close_btn cursor-pointer"
                            onClick={(e) => {
                                if ($('.tutorial_start_wrapper').classList.contains('flex')) {
                                    handleClose($('.tutorial_start_wrapper'), 'flex');
                                    handleOpen($('.tutorial_open_btn'), 'block');
                                }
                            }}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                        <p className="text-center mb-[16px] font-semibold">Bạn vẫn còn thắc mắc về Website của chúng tôi ?</p>
                        <button
                            className="bg-[#38B6FF] hover:bg-[#6dc9ff] cursor-pointer text-[#fff] px-[16px] py-[8px] rounded-[6px] tutorial_start_btn"
                            onClick={() => {

                                setIsStepEnabled(true)
                            }}
                        >Xem
                            hướng dẫn</button>
                    </div>
                </div>
                <Footer />
            </div>

        </>




    )
}


import React, { lazy, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'



import './ForumPage.css'


import { notifyErorr, notifyInfo } from '../../../components/Alert/AlertComponent'
import CreateThreadComponent from './CreateData/CreateThreadComponent'
import { getAllThreadApproved,  } from '../../../api/User/apiPost'

const Navigation = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
const PostList = lazy(() => import('./PostList/PostListComponent'))
export default function BlogComponent() {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    const threads = useSelector(state => state?.post?.thread?.content)
    const socket = useSelector(state => state?.socket?.socket)


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
                    getAllThreadApproved( dispatch)
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
                getAllThreadApproved( dispatch)
            })
        }

    }, [socket])

    return (
        <>
            <div className=" pt-[130px] pb-[90px] bg-[#13161B] relative min-h-[100vh] contentWrapper ">
                <Navigation currentUser={currentUser} />
                {isEditorShowThread === true && <CreateThreadComponent handleHideEditorThread={handleHideEditorThread} currentUser={currentUser} currentThread={threads} />}

                <Link to="/forum/user/create" className='ml-4 mt-4 block h-[50px] w-[50px] bg-[#1473e6] float-left p-[6px] rounded-full flex justify-center items-center  z-[9999]' title='Tạo bài viết'>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="text-white transition-all  h-[70%] duration-300 w-[70%] hover:scale-125 hover:opacity-50 hover:cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path></svg>
                </Link>
                <div className="max-w-[1092px] relative w-[100%] mx-auto flex flex-col items-center bodyWrapper pb-[80px]">

                    <div className="w-[100%] text-left mb-[60px]">
                        <p className="font-[900] text-[38px] p-white-forum">Bài viết nổi bật</p>
                        <p className='p-white-forum'>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học hóa, cảm xúc trong quá trình học.</p>
                    </div>

                    <div className="w-full flex">
                        <ul className="flex flex-col justify-start w-[60%]">
                            <PostList />

                        </ul>
                        <div className="ml-[60px] w-[40%] suggestedTopic">
                            <p className="mb-[12px]  p-white-forum ">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</p>
                            <div className="flex flex-wrap text-[#333] mx-[-8px]">
                                {threads?.map((thread) => (
                                    <div key={thread._id} className="bg-[#fafafa] select-none hover:bg-[#f2f2f2f2] text-[80%] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">{thread.content}</div>
                                ))}

                            </div>
                            <div className='my-0 mx-auto h-[50px] hover:bg-[#1473e66c] hover:cursor-pointer w-[50px] bg-[#1473e6] p-[6px] rounded-full flex justify-center items-center  z-99' title='Tạo bài chủ đề' onClick={() => {
                                handleShowEditorThread()
                            }}>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="text-white transition-all  h-[70%] duration-300 w-[70%] hover:scale-125 hover:opacity-50 hover:cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

        </>




    )
}


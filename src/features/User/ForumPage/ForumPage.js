import React, { lazy, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'



import './ForumPage.css'


import { notifyInfo } from '../../../components/Alert/AlertComponent'
import { createAxios } from '../../../utils/axiosJWT'
import CreateThreadComponent from './createData/CreateThreadComponent'

const Navigation = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
const PostList = lazy(() => import('./PostList/PostListComponent'))
export default function BlogComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    let axiosJWT = createAxios(currentUser, dispatch)

    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
            notifyInfo('Bạn cần đăng nhập để vào diễn đàn.')
        }

    }, [])

    //Toggle Editor
    const [isEditorShowThread, setIsEditorShowThread] = useState(false)
    const handleShowEditorThread = (e) => {

        setIsEditorShowThread(true)
    }
    const handleHideEditorThread = useCallback(() => {
        setIsEditorShowThread(false)

    }, [])




    return (
        <>
            <div className=" bg-[#13161B] mt-[96px] relative min-h-[100vh] ">
                <Navigation currentUser={currentUser} />
                {isEditorShowThread === true && <CreateThreadComponent handleHideEditorThread={handleHideEditorThread} />}
                <>
                    <Link to="/forum/user/create" className='ml-5 block h-[50px] w-[50px] bg-[#1473e6] p-[6px] rounded-full flex justify-center items-center  z-99' title='Tạo bài viết'>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="text-white transition-all  h-[70%] duration-300 w-[70%] hover:scale-125 hover:opacity-50 hover:cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path></svg>
                    </Link>
                    <div className="max-w-[1092px] w-[100%] mx-auto flex flex-col items-center bodyWrapper pb-[80px]">

                        <div className="w-[100%] text-left mb-[60px]">
                            <p className="font-[900] text-[38px] p-white-forum">Bài viết nổi bật</p>
                            <p className='p-white-forum'>Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học hóa, cảm xúc trong quá trình học.</p>
                        </div>

                        <div className="w-full flex">
                            <ul className="flex flex-col justify-start w-[60%]">
                                <PostList />
                                {/* <li className="my-[8px] w-[100%] rounded-[16px] p-[24px] border-solid border-[#2a2c34] border-[1px] bg-[#1e2029]">
                                    <div className="flex justify-between">
                                        <div className="flex items-center cursor-pointer">
                                            <div className="mr-[4px]">
                                                <img className="w-[28px] h-[28px] object-cover rounded-[50%]" src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                                            </div>
                                            <p className="font-medium p-white-forum hover:text-[#d54253]">Trịnh Văn Sơn</p>
                                        </div>
                                        <div>
                                            <i className="cursor-pointer fa-regular fa-bookmark  p-white-forum mr-[8px]"></i>
                                            <i className="cursor-pointer fa-solid fa-bookmark  p-white-forum mr-[8px] text-[#d54253]" style={{ display: 'none' }}></i>
                                            <i className="cursor-pointer fa-solid fa-ellipsis  p-white-forum"></i>
                                        </div>
                                    </div>
                                    <div className="mt-[8px] mb-[16px]">
                                        <div>
                                            <p className="text-[20px] p-white-forum font-[700] hover:text-[#d54253] cursor-pointer">Cách sử dụng Routing trong ReactJS</p>
                                            <p className="mt-[4px] p-white-forum leading-[1.6] text-[15px] font-light">Hôm nay chúng ta sẽ cùng nhau tìm hiểu cách routing trong reactjs qua thư viện react-router-dom</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p className=" p-white-forum">12 ngày trước</p>
                                        <i className=" fa-solid fa-circle text-[4px]  p-white-forum mx-[8px]"></i>

                                    </div>
                                </li>
                                <li className="my-[8px] w-[100%] rounded-[16px] p-[24px] border-solid border-[#2a2c34] border-[1px] bg-[#1e2029]">
                                    <div className="flex justify-between">
                                        <div className="flex items-center">
                                            <div className="mr-[4px]">
                                                <img className="w-[28px] h-[28px] object-cover rounded-[50%]" src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                                            </div>
                                            <p className="p-white-forum font-medium hover:text-[#d54253]">Trịnh Văn Sơn</p>
                                        </div>
                                        <div>
                                            <i className="cursor-pointer fa-regular fa-bookmark mr-[8px]  p-white-forum"></i>
                                            <i className="cursor-pointer fa-solid fa-bookmark mr-[8px] text-[#d54253]  p-white-forum" style={{ display: 'none' }}></i>
                                            <i className="cursor-pointer fa-solid fa-ellipsis  p-white-forum"></i>
                                        </div>
                                    </div>
                                    <div className="mt-[8px] mb-[16px] flex">
                                        <div className="mr-[24px]">
                                            <p className="text-[20px] p-white-forum font-[700] hover:text-[#d54253] cursor-pointer">Áo Polo F8 Đã Về! Trên Tay Áo Polo F8 Của F8</p>
                                            <p className="mt-[4px] p-white-forum leading-[1.6] text-[15px] font-light">Là thành viên F8, chúng ta luôn mong muốn được "nhận ra" ở mọi nơi. Hãy rinh cho mình áo Polo F8 ngay hôm nay nhé!</p>
                                        </div>
                                        <img className="object-cover w-[40%] rounded-[16px] cursor-pointer" src="https://files.fullstack.edu.vn/f8-prod/blog_posts/3590/628db70cc11eb.jpg" alt="" />
                                    </div>
                                    <div className="flex items-center">
                                        <p className=" p-white-forum">12 ngày trước</p>
                                        <i className=" fa-solid fa-circle text-[4px] mx-[8px]  p-white-forum"></i>

                                    </div>
                                </li> */}
                            </ul>
                            <div className="ml-[60px] w-[40%] ">
                                <p className="mb-[12px]  p-white-forum">CÁC CHỦ ĐỀ ĐƯỢC ĐỀ XUẤT</p>
                                <div className="flex flex-wrap text-[#333] mx-[-8px]">
                                    <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Cân bằng phương trình hóa học</div>
                                    <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Giải phương trình</div>
                                    <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Phương trình</div>
                                    <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Khác</div>

                                </div>
                                <div className='my-0 mx-auto h-[50px] hover:bg-[#1473e66c] hover:cursor-pointer w-[50px] bg-[#1473e6] p-[6px] rounded-full flex justify-center items-center  z-99' title='Tạo bài chủ đề' onClick={() => {
                                    handleShowEditorThread()
                                }}>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="text-white transition-all  h-[70%] duration-300 w-[70%] hover:scale-125 hover:opacity-50 hover:cursor-pointer" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                <Footer />
            </div>

        </>




    )
}


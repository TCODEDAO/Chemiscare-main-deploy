import moment from 'moment';
import React from 'react'
import { useRef } from 'react';
import { lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../../../../api/User/apiPost';
import { createAxios } from '../../../../utils/axiosJWT';
import 'moment/locale/vi'
import './SinglePostComponent.css'
import Avatar from '../../../../components/Avatar/AvatarComponent';
import xss from 'xss'
moment.locale('vi')
const Navigation = lazy(() => import('../../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../../components/Footer/FooterComponent'))
function SinglePostComponent() {
    const { postId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    let axiosJWT = createAxios(currentUser, dispatch)

    useEffect(() => {
        getPostById(currentUser, dispatch, axiosJWT, postId, navigate)
    }, [])

    const post = useSelector(state => state?.post?.posts?.filter(post => post._id === postId))
    console.log(post, document.querySelector('.partLeft'))

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
                                <i className="text-[20px] mb-[4px] fa-regular fa-heart post_Reaction"></i>
                                <i className="text-[20px] mb-[4px] fa-solid fa-heart post_Reaction__active text-[#d54253]" style={{ display: "none" }}></i>
                                10
                            </span>
                            <span className="flex flex-col items-center cursor-pointer text-[#fff]">
                                <i className="text-[20px] mb-[4px] fa-regular fa-comment comment_Icon__open" onClick={() => {
                                    comment_Wrapper.current.style.display = 'block'
                                }}></i>
                                20
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
                                    {post[0]?.userId?.avatar === true ? <img className="w-[50px] h-[50px] object-cover rounded-[50%]"
                                        src={post?.userId?.avatar}
                                        alt="" /> : <Avatar name={post[0]?.userId?.fullName}
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
                            <i className="comment_Icon__close fa-solid fa-xmark text-[24px] cursor-pointer py-[10px] pl-[10px]" onClick={() => {
                                comment_Wrapper.current.style.display = 'none'
                            }}></i>
                        </div>
                        <div>
                            <p className="text-[20px] font-medium mb-[40px] text-white">3 bình luận</p>
                            <div className="">
                                <div className="mb-[10px]">
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
                                        <span className="px-[20px] py-[8px] font-medium cursor-pointer text-white">HỦY</span>
                                        <span
                                            className="px-[20px] py-[8px] text-white font-medium bg-[#ccc] cursor-pointer rounded-[20px]">BÌNH
                                            LUẬN</span>
                                    </div>
                                </div>
                                <ul className="">
                                    <li className="flex my-[20px]">
                                        <div className="mr-[8px]">
                                            <img className="w-[36px] h-[36px] object-cover rounded-[50%]"
                                                src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
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
                                            <div className="my-[8px] hidden">
                                                <div className="flex items-end mb-[8px]">
                                                    <div className="mr-[8px]">
                                                        <img className="w-[36px] h-[36px] object-cover rounded-[50%]"
                                                            src="https://images.unsplash.com/photo-1650902153035-ecee8f4e8bb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                                            alt="" />
                                                    </div>
                                                    <div className="grow">
                                                        <input
                                                            className="w-full font-light bg-[transparent] py-[8px] outline-none border-solid border-[#2a2c34] border-b-[1.4px]"
                                                            type="text" placeholder="Viết bình luận của bạn..." />
                                                    </div>
                                                </div>
                                                <div className="justify-end flex">
                                                    <span className="px-[20px] py-[8px] font-medium cursor-pointer">HỦY</span>
                                                    <span className="px-[20px] py-[8px] font-medium bg-[#ccc] cursor-pointer rounded-[20px]">TRẢ LỜI</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center cursor-pointer mb-8px">
                                                    <p className="font-medium mr-[8px]">Xem 2 câu trả lời</p>
                                                    <i className="fa-solid fa-angle-down"></i>
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
                                                            <ul>
                                                                <li>
                                                                    <ul className="">
                                                                        <li className="flex my-[20px]">
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SinglePostComponent
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { notifyInfo } from '../../../components/Alert/AlertComponent'
import Avatar from '../../../components/Avatar/AvatarComponent'
import Footer from '../../../components/Footer/FooterComponent'
import { setUser } from '../../../redux/User/AuthSlice'
import { createAxios } from '../../../utils/axiosJWT'
import PostListComponent from '../ForumPage/PostList/PostListComponent'
import './UserPage.css'


function AnotherPage() {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const results = useSelector(state => state?.quiz?.resultAllUser)
    const currentUsers = useSelector((state) => state?.auth?.login?.currentUser)
    let currentUser = useSelector(state => state?.auth?.user)
    const axiosJWT = createAxios(currentUsers, dispatch)
    useEffect(async () => {
        const user = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/${userId}`, {
            headers: { token: `Bearer ${currentUsers?.accessToken}` },
        })
        dispatch(setUser(user.data))


    }, [])
    useEffect(async () => {

        if (!currentUsers) {
            navigate('/auth')
            notifyInfo('Bạn cần đăng nhập để vào học!')
            return
        }


    }, [])
    return (
        <>
            <div className="pb-[80px] bg-[#13161B] relative min-h-[100vh] content_Wrapper">

                <div className="fixed  top-0 right-0 left-0 z-30 flex ">
                    <div className="cursor-pointer animationHoverF8 flex bg-[rgba(51,51,51,0.8)] items-center py-[10px] px-[20px] text-[20px] m-[8px] rounded-[8px]" onClick={() => navigate(-1)}>
                        <i className="fa-solid fa-angle-left mr-[4px] text-white animationHoverF8Obj "></i>
                        <p className='text-white  cursor-pointer ' onClick={() => navigate(-1)} >Quay Lại</p>
                    </div>
                </div>
                <div className="max-w-[1092px] w-[100%] mx-auto flex bodyWrapper flex-wrap">
                    <div className="w-[100%] text-center mb-[40px]">
                        <div className="relative">
                            <div className="">
                                <img className="coverImage rounded-br-[16px] rounded-bl-[16px] h-[50vh] w-[100%] object-cover" src="https://wiibook.net/wp-content/uploads/2020/09/list-sach-hay-ve-hoa-hoc-cover-757x470.png" alt="" />
                            </div>
                            <div className="absolute left-[50%] translate-x-[-50%] translate-y-[50%] bottom-0" >
                                {currentUser?.avatar ? <img className="h-[180px] w-[180px] object-cover rounded-[50%] shadow-[0_0_0_6px_#13161B]" src={currentUser?.avatar} alt="" /> : <Avatar size="180px" name={currentUser?.fullName}></Avatar>}

                            </div>
                        </div>
                        <div className="mt-[100px]">
                            <p className="font-semibold text-[24px] text-white">{currentUser?.fullName}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="listPost__wrapper w-[60%] min-w-[224px]">
                            {/* <div className="w-[100%] text-left mb-[10px]"> */}
                            <p className="font-[900] text-[30px] text-white">Bài viết nổi bật</p>
                            {/* </div> */}
                            <PostListComponent filter={currentUser?._id} />

                        </div>
                        {/* <div className="ml-[60px] w-[40%] suggestedTopic">
                            <p className="font-bold text-[30px]">Thuộc các chủ đề</p>
                            <div className="flex flex-wrap text-[#333]">
                                <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Cân bằng phương trình hóa học</div>
                                <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Giải phương trình</div>
                                <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Phương trình</div>
                                <div className="bg-[#fafafa] hover:bg-[#f2f2f2] cursor-pointer px-[10px] py-[8px] rounded-[18px] m-[6px]">Other</div>
                            </div>
                        </div> */}
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </>
    )
}

export default AnotherPage
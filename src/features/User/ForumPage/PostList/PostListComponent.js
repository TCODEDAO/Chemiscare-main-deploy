import React, { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../../../../api/User/apiPost'
import { createAxios } from '../../../../utils/axiosJWT'
import moment from 'moment'
import 'moment/locale/vi'
import { notifyErorr } from '../../../../components/Alert/AlertComponent'


moment.locale('vi')
const loadAnimate = require('../../../../assets/images/gif/noBgLoad.gif')
const PostExcerpt = ({ post }) => {
    return (
        <li className="my-[8px] w-[100%] rounded-[16px] p-[24px] border-solid border-[#2a2c34] border-[1px] bg-[#1e2029]">
            <div className="flex justify-between">
                <div className="flex items-center cursor-pointer">
                    <div className="mr-[4px]">
                        <img className="w-[28px] h-[28px] object-cover rounded-[50%]" src={post?.userId.avatar} alt="" />
                    </div>
                    <p className="font-medium p-white-forum hover:text-[#d54253] ml-2">{post?.userId.fullName}</p>
                </div>
                <div>
                    <i className="cursor-pointer fa-regular fa-bookmark  p-white-forum mr-[8px]"></i>
                    <i className="cursor-pointer fa-solid fa-bookmark  p-white-forum mr-[8px] text-[#d54253]" style={{ display: 'none' }}></i>
                    <i className="cursor-pointer fa-solid fa-ellipsis  p-white-forum"></i>
                </div>
            </div>
            <div className="mt-[8px] mb-[16px]">
                <div>
                    <p className="text-[20px] p-white-forum font-[700] hover:text-[#d54253] cursor-pointer">{post?.title}</p>
                    <p className="mt-[4px] p-white-forum leading-[1.6] text-[15px] font-light">{post.content.slice(0, 100)}...</p>
                </div>
            </div>
            <div className="flex items-center">
                <p className=" p-white-forum">{moment(post.createdAt).fromNow()}</p>
                <i className=" fa-solid fa-circle text-[4px]  p-white-forum mx-[8px]"></i>

            </div>
        </li>
    )
}


export default function PostListComponent() {

    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    const postList = useSelector(state => state?.post?.posts)

    const dispatch = useDispatch()
    let axiosJWT = createAxios(currentUser, dispatch)
    useEffect(() => {
        if (currentUser) {
            getAllPost(currentUser, dispatch, axiosJWT)
        }
    }, [])

    const postStatus = useSelector(state => state.post.status)


    let content
    if (postStatus === 'loading') {

        content = <div className='flex justify-center items-baseline'>   <img src={loadAnimate} width="80" alt="" /></div>
    } else if (postStatus === 'success') {
        content = postList.map((post, index) => (
            <PostExcerpt post={post} key={index} />
        ))
    } else if (postStatus === 'failed') {
        content = <div className='text-white' onLoad={() => {
            window.location.reload()
        }}>Lấy bài viết không thành công!</div>
    }

    return (
        <>
            {content}
        </>
    )
}

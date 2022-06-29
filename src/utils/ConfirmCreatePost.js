import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { animated, config, useSpring } from '@react-spring/web'
import { createAxios } from '../utils/axiosJWT'
import { getAllThreadApproved } from '../api/User/apiPost'
import { useNavigate } from 'react-router-dom'
import { notifyInfo, notifyWarn } from '../components/Alert/AlertComponent'
import './styleAll.css'
function ConfirmCreatePost({ handleSubmitPost, handleHideConfirm }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const threads = useSelector(state => state?.post?.thread?.content)
    const [styles, api] = useSpring(() => ({ to: { opacity: 1, scale: 0.75, x: '-50%' }, from: { opacity: 0, scale: 0.9, x: '-50%' }, config: config.gentle, delay: 200 }))
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    let axiosJWT = createAxios(currentUser, dispatch)
    const socket = useSelector(state => state?.socket?.socket)

    const [threadSelect, setThreadSelect] = useState('default')
    const threadsOptions = threads?.map(thread => (
        <option className='cursor-pointer' key={thread?._id} value={thread?._id}>
            {thread?.content}
        </option>
    )
    )
    useEffect(() => {
        if (currentUser) {
            getAllThreadApproved(currentUser, dispatch, axiosJWT)
        }
    }, [])
    const handleSetThreadSelect = (e) => {
        if (e.target.value === 'create') {
            window.open('/forum', '_blank');
        }

        setThreadSelect(e.target.value)
    }
    const handleSubmitPostToAdmin = () => {
        if (threadSelect === 'default' || threadSelect === 'create') {
            notifyWarn('Bạn cần chọn chủ đề thảo luận!')

        } else {

            handleSubmitPost(threadSelect)
        }
    }
    useEffect(() => {
        if (socket) {
            socket.on('ApprovedSuccessThread', () => {
                getAllThreadApproved(currentUser, dispatch, axiosJWT)
            })
        }

    }, [])
    return (


        <div className='w-[100%] h-[100%] z-[9999] absolute bg-[rgba(0,0,0,0.5)]'>
            <animated.div style={styles} className=' rounded-[40px] min-w-[420px] p-[10px]  w-[54%] h-[60%] fixed left-[50%] translate-x-[-50%] bg-[#55efc4] '>
                <div className='text-[#f5f6fa] font-semibold text-[30px] text-center pt-[2%] selection:bg-[#e84118] '>Đăng bài viết</div>
                <i className="fa fa-times absolute top-[20px] right-[40px] select-none text-[40px] cursor-pointer hover:text-[#e74c3c] transition-all duration-700" aria-hidden="true" onClick={() => {
                    handleHideConfirm()
                }}></i>
                <label htmlFor="thread" className='block mt-[8%] font-semibold'>Chủ đề thảo luận:</label>
                <select className={`cursor-pointer      
                mt-[2%]        
               form-select
               appearance-none
                block
                w-full
                px-6
                py-4
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded-2xl
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-[#0000003a] focus:outline-none
                
                
                
                `} defaultValue="default" id="thread" onChange={handleSetThreadSelect}>
                    <option value="default" disabled hidden>Chọn chủ đề thảo luận...</option>
                    {threadsOptions}
                    <option className='cursor-pointer outline-none' value="create" >Hoặc tạo chủ đề...</option>
                </select>
                <button className='absolute bottom-[8%] py-6 px-12 rounded-[4rem] left-1/2 -translate-x-1/2 bg-[#ff7675] text-[20px] text-[#dfe6e9] hover:bg-[#ff7575cf] transition-all duration-300' onClick={handleSubmitPostToAdmin}>Gửi</button>
            </animated.div>
        </div>

    )
}

export default ConfirmCreatePost
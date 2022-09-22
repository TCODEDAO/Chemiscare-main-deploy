import React, { memo, useEffect, useState } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { useDispatch, useSelector } from 'react-redux'

import './CreateThreadComponent.css'
import { notifyInfo } from '../../../../components/Alert/AlertComponent'
function CreateThreadComponent({ handleHideEditorThread, currentUser }) {
    const [styles, api] = useSpring(() => ({ to: { opacity: 1, y: '0px', x: '-50%', scale: 0.75 }, from: { opacity: 0, y: '-30px', scale: 0.9, x: '-50%' }, config: config.wobbly, delay: 200 }))
    const socket = useSelector(state => state?.socket?.socket)




    const [content, setContent] = useState('')

    const handleCreateNewThread = () => {
        if (!currentUser) {
           
            notifyInfo('Bạn cần đăng nhập để tạo các chủ đề!')
            return 
        }
        socket.emit('createNewThread', { content: content, userId: currentUser?._id })


        handleHideEditorThread()
    }
    return (
        <>

            <div className='h-screen w-screen fixed z-[999999]' onDoubleClick={(e) => {
                e.stopPropagation()
                handleHideEditorThread()
            }}>
                <animated.div style={styles} className='w-[50%] h-[54%] min-w-[630px] min-h-[408px] fixed z-9999 bg-slate-50 rounded-[40px] overflow-hidden top-[20%] left-[50%] translate-x-[-50%] transition-all duration-200' onDoubleClick={(e) => e.stopPropagation()}>
                    <div>
                        <div className='absolute top-[10px] left-[50%] translate-x-[-50%] font-bold text-[42px] select-none'>Tạo chủ đề</div>
                        <i className="fa fa-times absolute top-[20px] right-[40px] select-none text-[40px] cursor-pointer hover:text-[#e74c3c] transition-all duration-700" aria-hidden="true" onClick={() => {
                            handleHideEditorThread()
                        }}></i>
                    </div>
                    <div className='threadInput '>
                        <input type="text" className="inputText outline-none" value={content} onChange={e => setContent(e.target.value)} maxLength="60" required />
                        <span className="floating-label">Tên chủ đề muốn tạo...</span>
                    </div>
                    <div className="flex justify-center items-center relative top-[66%] left-[28%]">
                        <button className='mx-4 px-[36px] py-[14px] bg-[#02080c] hover:bg-[#f35757f9] transition-all duration-200 rounded-[20px] text-white' onClick={() => { handleHideEditorThread() }}>Hủy</button>
                        <button className='mx-4 px-[36px] py-[14px] bg-[#3498db] hover:bg-[#2ecc71] transition-all duration-200 rounded-[20px] text-white' onClick={handleCreateNewThread}>Tạo</button>
                    </div>
                </animated.div>
            </div>
        </>
    )
}

export default memo(CreateThreadComponent)


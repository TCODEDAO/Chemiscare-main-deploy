import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Helmet from 'react-helmet'
import './StartGameComponent.css'
import ripplesAnimateBtn from './animation'
import Tilt from 'react-vanilla-tilt'
import { useSelector, useDispatch } from 'react-redux'

import { getQuestionAndAnswers } from '../../../../../api/User/apiQuestion'
import { createAxios } from '../../../../../utils/axiosJWT'
import { notifyInfo } from '../../../../../components/Alert/AlertComponent'

export default function HomeComponent() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth?.login?.currentUser)
    const SpeechBubble = useRef(null)
    const axiosJWT = createAxios(currentUser, dispatch)
    useEffect(() => {
        const fixRectangle = document.getElementById('Rectangle')
        const fixNavigate = document.getElementById('fixNavigate')
        let timeOut1, timeOut2
        if (!currentUser) {
            notifyInfo('Bạn cần đăng nhập để vào học!')
            navigate('/auth')
        }
        getQuestionAndAnswers(currentUser, dispatch, axiosJWT, navigate)

        fixNavigate.addEventListener('click', (e) => {
            ripplesAnimateBtn(e.target, e)
            timeOut1 = setTimeout(() => navigate('/learn/game'), 2000)
        })
        fixRectangle.addEventListener('load', () => {
            timeOut2 = setTimeout(() => {
                Object.assign(SpeechBubble.current.style, {
                    'animation-name': 'expand-bounce',
                    'animation-duration': '0.25s',
                })
            }, 500)
        })
        return () => {
            fixNavigate.removeEventListener(
                'click',
                (e) => {
                    ripplesAnimateBtn(e.target, e)
                    timeOut1 = setTimeout(() => navigate('/learn/game'), 1000)
                },
                false,
            )
            fixRectangle.removeEventListener(
                'load',
                () => {
                    timeOut2 = setTimeout(() => {
                        Object.assign(SpeechBubble.current.style, {
                            'animation-name': 'expand-bounce',
                            'animation-duration': '0.25s',
                        })
                    }, 500)
                },
                false,
            )
            clearTimeout(timeOut1)
            clearTimeout(timeOut2)
        }
    }, [])

    return (
        <div
            className="responsiveBackGroundGame flex justify-center items-center"
            style={{
                backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/img/bg.png)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Helmet>
                <title>Quiz</title>
            </Helmet>

            <div className=" w-[940px] min-h-[350px] py-[30px] px-[38px] rounded-[16px] bg-white shadow-[0_0_50px_0_rgba(0,0,0,0.2)]">
                <Tilt
                    options={{ max: 35, scale: 2 }}
                    style={{
                        borderRadius: '4px',
                        display: 'inline-block ',
                        textAlign: 'center',
                        margin: '0 !important',
                        padding: '0  !important',
                        cursor: 'pointer',
                        userSelect: 'none',
                    }}
                >
                    <div className="">
                        <i className="fa-solid fa-atom text-[40px] text-black mr-1 "></i>
                        <span className="font-bold text-[36px] text-black">
                            Chemiscare
                        </span>
                    </div>
                </Tilt>
                <div>
                    <img
                        src={`${process.env.REACT_APP_PUBLIC_URL}/img/teacher.png`}
                        alt="Teacher"
                        className="w-[100px] h-[100px] relative top-[128px] left-[-2px] z-[10] "
                        id="Rectangle"
                    />
                    <div
                        id="SpeechBubble"
                        className="mt-[10px] xl:top-[305px] xl:left-[296px] lg:top-[204px] lg:left-[158px] "
                        ref={SpeechBubble}
                    >
                        <p>
                            Trả lời các câu hỏi bằng cách chọn đáp án trong các
                            câu. Mỗi câu trả lời đúng sẽ ghi được 10 điểm, có 10
                            câu hỏi và tối đa 100 điểm. Bạn có 10 phút để trả
                            lời toàn bộ câu hỏi. Chúc bạn may mắn.
                        </p>
                    </div>
                </div>

                <div
                    className="z-[10000] absolute top-[56%] left-[50%] block translate-x-[-50%] py-[24px] px-[72px] my-[10px] no-underline text-[18px] tracking-wide rounded-[40px] bg-gradient-to-r from-[#775bea] to-[#ff72c0] cursor-pointer overflow-hidden responsiveStartBtn"
                    id="fixNavigate"
                >
                    <p className="text-white select-none"> Bắt Đầu</p>
                </div>
            </div>
        </div>
    )
}

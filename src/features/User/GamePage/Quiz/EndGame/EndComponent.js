import React, { useCallback, useRef, useEffect, useState } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { animated, useTransition, config } from '@react-spring/web'
import { notifyInfo } from '../../../../../components/Alert/AlertComponent'
import { clearDataToNewRound } from '../../../../../redux/User/QuizSlice'
import './EndComponent.css'
const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
}

export default function Realistic() {
    const navigate = useNavigate()
    const [isBoardShow, setIsBoardShow] = useState(false)
    const currentUser = useSelector((state) => state?.auth?.login.currentUser)
    const score = useSelector((state) => state?.quiz?.score?.currentScore)
    const timePlay = useSelector((state) => state?.quiz?.time?.counter)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!currentUser) {
            notifyInfo('Bạn cần đăng nhập để vào học!')
            navigate('/auth')
        }
    }, [])
    const refAnimationInstance = useRef(null)

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance
    }, [])

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                angle: 15,
                tick: 1,
                origin: { y: 0.5, x: 0 },
                particleCount: Math.floor(1400 * particleRatio),
            })
    }, [])
    const makeShot2 = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                angle: 135,
                tick: 1,
                origin: { y: 0.6, x: 1 },
                particleCount: Math.floor(1400 * particleRatio),
            })
    }, [])

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
        })

        makeShot(0.2, {
            spread: 60,
        })

        makeShot(0.35, {
            spread: 120,
            decay: 0.91,
            scalar: 0.8,
        })

        makeShot(0.1, {
            spread: 150,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        })

        makeShot(0.1, {
            spread: 150,
            startVelocity: 45,
        })
    }, [makeShot])
    const fire2 = useCallback(() => {
        makeShot2(0.25, {
            spread: 26,
            startVelocity: 55,
        })

        makeShot2(0.2, {
            spread: 60,
        })

        makeShot2(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        })

        makeShot2(0.1, {
            spread: 150,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        })

        makeShot2(0.1, {
            spread: 150,
            startVelocity: 45,
        })
    }, [makeShot])
    useEffect(() => {
        const timeOut = setTimeout(() => {
            fire()
            fire2()
        }, 1000)
        setIsBoardShow(true)
        return () => {
            dispatch(clearDataToNewRound())
            clearTimeout(timeOut)
        }
    }, [])
    const showQuizBoard = useTransition(isBoardShow, {
        from: { opacity: 0, scale: 0.75 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0.76 },
        delay: 3000,
        config: config.slow,
    })

    return (
        <>
            <div className="h-screen w-screen bg-[#3da1d1]">
                {isBoardShow &&
                    showQuizBoard((style, item) =>
                        item ? (
                            <animated.div
                                style={{ ...style }}
                                className="h-screen w-screen flex justify-center items-center overflow-hidden "
                            >
                                <div className="min-w-[495px] min-h-[347px] bg-[#636e72] rounded-[40px] flex flex-col justify-evenly items-center">
                                    <div className="congrats">
                                        <h1 className="h1Congrats">
                                            Chúc Mừng!
                                        </h1>
                                    </div>
                                    <div className="text-[38px] font-semibold text-[#fdcb6e] ">
                                        Điểm: <span>{score}/100</span>
                                    </div>
                                    <div className="text-[38px] font-semibold text-[#dfe6e9]">
                                        Thời gian: <span>{timePlay}</span> giây
                                    </div>
                                    <div className="text-[36px] text-[#ff7675]">
                                        {currentUser.fullName}
                                    </div>
                                    <div
                                        className="p-[14px] px-[24px] hover:opacity-[0.7] transition-all duration-700 bg-[#fd79a8] rounded-[20px] font-mono text-[#f5f6fa] font-semibold select-none cursor-pointer"
                                        id="navigateToLearn"
                                        onClick={() => {
                                            navigate('/learn')
                                        }}
                                    >
                                        OK
                                    </div>
                                </div>
                            </animated.div>
                        ) : (
                            ''
                        ),
                    )}

                <ReactCanvasConfetti
                    refConfetti={getInstance}
                    style={canvasStyles}
                />
            </div>
        </>
    )
}

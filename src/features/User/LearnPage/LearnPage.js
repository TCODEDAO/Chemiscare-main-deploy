import './LearnPage.css'
import React, { useEffect, lazy, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

//assets
import favicon from '../../../assets/images/icons/learnFavicon.ico'

//AxiosJWT
import { createAxios } from '../../../utils/axiosJWT'
//Notify
import { notifyInfo, notifyWelcome } from '../../../components/Alert/AlertComponent'

import { setTask } from '../../../redux/User/QuizSlice'
import { getAllResultQuizById, getRound, increaseRound } from '../../../api/User/apiQuestion'
import loadingGif from '../../../assets/images/gif/noBgLoad.gif'
import { useState } from 'react'

//Intro 
import Tour from 'reactour'
import bottleLogo from "../../../assets/images/icons/icon_human_chemiscal.svg"

const Header = lazy(() => import('../../../components/Header/HeaderComponent'))
const Nav = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))



export default function LearnPage() {
    const $ = document.querySelector.bind(document)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)


    const axiosJWT = createAxios(currentUser, dispatch)
    const currentRound = useSelector(state => state?.quiz?.round?.currentRound)

    useEffect(async () => {


        // if (!currentUser) {
        //     navigate('/auth')
        //     notifyInfo('Bạn cần đăng nhập để vào học!')
        //     return
        // }
        // if (!currentUser.detailUserInfomation || !currentUser?.detailUserInfomation?.grade) {
        //     navigate('/auth/detail')
        //     notifyInfo('Bạn cần thêm thông tin để vào học!')
        //     return
        // }

        if (currentUser) {
            setLoading(true)
            await getRound(dispatch, axiosJWT, currentUser)
            getAllResultQuizById(currentUser, dispatch, axiosJWT)
            setLoading(false)
            notifyWelcome(`Chào mừng bạn!`)
            return
        }

    }, [])
    const handleSubmitTaskAndNextRound = () => {
        setLoading(true)

        increaseRound(dispatch, axiosJWT, currentUser, currentRound)
        setLoading(false)

    }

    const userProcess = useSelector(state => state?.quiz?.allResultHistory)
    const currentUserProcess = useSelector(state => state?.quiz?.result)
    // history handle
    const [UserHistoryShow, setUserHistoryShow] = useState({
        id: [],
        times: [],
        round: [],
        task: [],
        scores: [],
    })
    useEffect(() => {
        userProcess.forEach((item, index) => {
            setUserHistoryShow((prev) => {
                return {
                    id: [...prev.id, index + 1],
                    times: [...prev.times, item.time],
                    round: [...prev.round, item.round],
                    task: [...prev.task, item.task],
                    scores: [...prev.scores, item.score],

                }
            })


        })
        return () => {
            setUserHistoryShow((prev) => {
                return {
                    id: [],
                    times: [],
                    round: [],
                    task: [],
                    scores: [],

                }
            })
        }
    }, [userProcess])


    const [isStepEnabled, setIsStepEnabled] = useState(false)

    const steps = [
        {
            selector: '',
            content: () => {
                return (
                    <div className='flex  items-center flex-col text-[14px]'>
                        <span className='text-black'>Chào mừng bạn đã đến với phần hướng dẫn nhanh của chúng tôi!</span>
                        <button
                            style={{

                            }}
                            onClick={() => navigate('/help/usage')}
                        >
                            {/* <span className='hover:underline font-[10px] text-black'>Nếu bạn muốn biết thêm chi tiết về các tính năng, vui lòng bấm vào đây!{" "}</span> */}

                        </button>
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
            selector: '.container-react-tour',
            content: 'Đây là thành phần chính trang học tập của Chemiscare, bạn có thể thực hiện các thao tác học tập trong đây.',

        },
    ]

    const handleJoinInTask = (task) => {
        dispatch(setTask(task))
        navigate('/learn/game/start')
    }



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
                <title>Học Tập</title>
            </Helmet>
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
            <Header currentUser={currentUser} />
            <div className="flex mt-[100px] w-[90%] mb-[8px] body">
                <Nav />


                <div className="ml-[40px] w-full pb-[64px]">
                    <div className='container-react-tour'>
                        <div className="flex items-center relative justify-evenly slider box-border p-[8px]">
                            <div className="mr-[16px] z-10">
                                <p className="text-[60px] font-black">Hello {currentUser?.fullName.split(' ')[currentUser?.fullName.split(' ').length - 1]}!</p>
                                <p>Cùng bắt đầu một ngày học tập mới thất bùng nổ nào ^^</p>
                            </div>
                            <img className="w-[220px] z-10 w-[220px] z-10 slider_modal mb-[-8px]" src={bottleLogo} alt="" />
                            <div className="bg-[#E0F2FE] w-full absolute bottom-0 h-[80%] rounded-[16px] slider_background"></div>
                        </div>
                        <div className="mt-[32px]">
                            <p className="font-bold text-2xl leading-5 mb-[20px]  board_title">Đề thi dành cho học sinh lớp {currentUser?.detailUserInfomation?.grade}</p>
                            <p className="mb-[16px] text-[24px] font-bold board_title">Vòng thi hiện tại: {currentRound}</p>
                            {currentRound < 4 ? Boolean(currentUserProcess[0] && currentUserProcess[1] && currentUserProcess[2]) && <button className='inline-block m-4 text-white bg-[#54a0ff] hover:bg-[#1dd1a1]  outline-none rounded-3xl transition-all duration-300 p-3' onClick={handleSubmitTaskAndNextRound}>Nộp bài</button> : <div className='text-white'>Vui lòng xem lịch thi để biết thêm thông tin về vòng thi mới!</div>}
                            <div className="board flex border-solid border-[1px] border-[#e8e8e8] rounded-[6px] font-bold overflow-hidden">
                                <ul className="w-[25%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">STT</li>
                                    <li className="w-[100%] h-[60px] flex items-center justify-center board_col_item p-[2px]">1</li>
                                    <li className="w-[100%] h-[60px] flex items-center justify-center board_col_item p-[2px]">2</li>
                                    <li className="w-[100%] h-[60px] flex items-center justify-center board_col_item p-[2px]">3</li>
                                </ul>
                                <ul className="w-[25%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">BÀI THI
                                    </li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">
                                        {(currentUserProcess[0]?.isCompleteRender === true || currentRound > 3) ? <button className="bg-[#3f3f46]  text-[#fff] px-[1.2vw] py-[0.6vw] rounded-[6px] " disabled>Hoàn thành</button> : <button className="bg-[#38B6FF] hover:bg-[#6dc9ff] cursor-pointer text-[#fff]  px-[1.2vw] py-[0.6vw] rounded-[6px] btn" onClick={() => {
                                            if (!currentUser) {
                                                notifyInfo('Bạn cần đăng nhập để bắt đầu làm bài tập này!')
                                                return
                                            }
                                            handleJoinInTask(1)
                                        }}>Làm bài 1 </button>}

                                    </li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">
                                        {(currentUserProcess[1]?.isCompleteRender === true || currentRound > 3) ? <button className="bg-[#3f3f46]  text-[#fff]  px-[1.2vw] py-[0.6vw] rounded-[6px] " disabled>Hoàn thành</button> : <button className="bg-[#38B6FF] hover:bg-[#6dc9ff] cursor-pointer text-[#fff]  px-[1.2vw] py-[0.6vw] rounded-[6px] btn" onClick={() => {
                                            if (!currentUser) {
                                                notifyInfo('Bạn cần đăng nhập để bắt đầu làm bài tập này!')
                                                return
                                            }
                                            handleJoinInTask(2)
                                        }}>Làm bài 2 </button>}

                                    </li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">
                                        {(currentUserProcess[2]?.isCompleteRender === true || currentRound > 3) ? <button className="bg-[#3f3f46]  text-[#fff]  px-[1.2vw] py-[0.6vw] rounded-[6px] " disabled>Hoàn thành</button> : <button className="bg-[#38B6FF] hover:bg-[#6dc9ff] cursor-pointer text-[#fff]  px-[1.2vw] py-[0.6vw] rounded-[6px] btn" onClick={() => {
                                            if (!currentUser) {
                                                notifyInfo('Bạn cần đăng nhập để bắt đầu làm bài tập này!')
                                                return
                                            }
                                            handleJoinInTask(3)
                                        }}>Làm bài 3 </button>}

                                    </li>
                                </ul>
                                <ul className="w-[25%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">ĐIỂM</li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{currentUserProcess[0]?.score}</li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{currentUserProcess[1]?.score}</li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{currentUserProcess[2]?.score}</li>
                                </ul>
                                <ul className="w-[25%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">THỜI GIAN
                                    </li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{currentUserProcess[0]?.time && `${currentUserProcess[0]?.time} giây`}</li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{currentUserProcess[1]?.time && `${currentUserProcess[1]?.time} giây`}</li>
                                    <li className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{currentUserProcess[3]?.time && `${currentUserProcess[2]?.time} giây`}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-[32px]">
                            <p className="mb-[16px] text-[24px] font-bold board_title">Lịch sử thi các vòng thi của bạn</p>
                            <div className="board flex border-solid border-[1px] border-[#e8e8e8] rounded-[6px] font-bold overflow-hidden">
                                <ul className="w-[25%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">STT</li>
                                    {UserHistoryShow.id.map((id, index) => {
                                        return <li key={index} className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{id}</li>
                                    })}
                                </ul>
                                <ul className="w-[33.3333%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">Vòng</li>

                                    {UserHistoryShow.round.map((round, index) => {
                                        return <li key={index} className="h-[60px] flex items-center justify-center board_col_item p-[2px]">
                                            <span
                                                className="bg-[#38B6FF] hover:bg-[#6dc9ff] text-[#fff] px-[16px] py-[8px] rounded-[6px] btn"
                                            >{round}</span>
                                        </li>
                                    })}
                                </ul>
                                <ul className="w-[33.3333%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">ĐIỂM</li>
                                    {UserHistoryShow.scores.map((score, index) => {
                                        return <li key={index} className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{score}</li>
                                    })}
                                </ul>
                                <ul className="w-[33.3333%]">
                                    <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">THỜI GIAN
                                    </li>
                                    {UserHistoryShow.times.map((time, index) => {
                                        return <li key={index} className="h-[60px] flex items-center justify-center board_col_item p-[2px]">{time} giây</li>
                                    })}
                                </ul>

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

        </>
    )
}

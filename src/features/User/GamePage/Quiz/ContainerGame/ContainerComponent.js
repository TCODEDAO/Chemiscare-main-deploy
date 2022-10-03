import React, { useEffect, useRef, useState } from 'react'
import { useSpring, useTransition, animated, config } from '@react-spring/web'
import EndComponent from '../EndGame/EndComponent'
import AnswerComponent from './AnswerComponent'
import ScoreComponent from './ScoreComponent'
import './GameComponent.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyErorr, notifyInfo } from '../../../../../components/Alert/AlertComponent'
import { questionsReturn } from './renderData'
import { timeIncrease } from '../../../../../redux/User/QuizSlice'
import { createNewResultQuiz } from '../../../../../api/User/apiQuestion'
import { createAxios } from '../../../../../utils/axiosJWT'
import { playSound } from '../../../../../utils/playSound'


export default function QuestionComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const score = useSelector(state => state?.quiz?.score?.currentScore)
    const timePlay = useSelector(state => state?.quiz?.time?.counter)
    const task = useSelector(state => state?.quiz?.task?.currentTask)
const currentRound = useSelector(state=>state?.quiz?.round?.currentRound)
    

    //LoadingToGame
    const [playThemeSound,setPlayThemeSound] = useState(false)
    const [isCountDown, setIsCountDown] = useState(true)
    const [flip, setFlip] = useState(false)
    const [isQuizCount, setIsQuizCount] = useState(false)
    const [quizNumberCount, setQuizNumberCount] = useState(0)
  const [quizCorrectCount,setQuizCorrectCount] = useState(0)
const [prevQuizCorrectCount,setPrevQuizCorrectCount] = useState(0)
    const [stylesloadingToGame, apiloadingToGame] = useSpring(() => ({
        to: { opacity: 1 },
        from: { opacity: 0 },
        reset: true,
        reverse: flip,
        delay: 200,
        config: config.molasses,
        // onRest: () => setFlip(!flip),
    }))

    const [timeLeft, setTimeLeft] = useState(3)

    useEffect(() => {
        let showStartTimeOut
        let intervalId
        if (timeLeft === 'Bắt Đầu') {
            showStartTimeOut = setTimeout(() => {
                apiloadingToGame.pause()
                setIsCountDown(false)
                setIsQuizCount(true)
                setPlayThemeSound(true)
            }, 400)


        }
        if (timeLeft === 0) {
            setTimeLeft('Bắt Đầu')

        }

        if (!timeLeft) return

        intervalId = setInterval(() => {
            if (timeLeft !== 'Bắt đầu') {

               
                setTimeLeft(timeLeft - 1)
            }
        }, 1600)

        return () => {
            clearTimeout(showStartTimeOut)
            clearInterval(intervalId)
        }
    }, [timeLeft])

    let renderNumber
    if (timeLeft === 0) {
        renderNumber = 'Bắt Đầu'
        apiloadingToGame.pause()
        setTimeLeft('Bắt Đầu')

    } else {
        renderNumber = timeLeft
    }


    //EndLoadingToGame
    const showQuizContainer = useTransition(!isQuizCount, {
        from: { opacity: 0.6, },
        enter: { opacity: 1 },
        leave: { opacity: 0.8 },
        config: config.gentle,


    })

    // Show Quiz Count
    const showQuizCount = useTransition(isQuizCount, {
        from: { opacity: 1, },
        enter: { opacity: 1, },
        leave: { opacity: 0, },
        config: config.slow
    })
    useEffect(() => {
        let hideQuizCount
        if (isQuizCount && quizNumberCount < 11) {
            setQuizNumberCount((prevState)=>{
               return prevState + 1
            })
            hideQuizCount = setTimeout(() => {
                setIsQuizCount(false)
            }, 500)

        }
        if (quizNumberCount > 10) {
            let axiosJWT = createAxios(currentUser, dispatch)

            createNewResultQuiz(currentUser, axiosJWT, {
                score: score,
                time: timePlay,
                round: currentRound,
                task: task,
                isCompleteRender: true,
            })

        }

        return () => {
            clearTimeout(hideQuizCount)
        }
    }, [isQuizCount])

    //Next Question
    const nextQuestion = () => {
        setIsQuizCount(true)

    }


    //Check is login
    const currentUser = useSelector(state => state.auth.login.currentUser)


    const questionData = useSelector(state => state?.quiz?.question?.questionList)

    const questions = questionData.question

    const refQuestion = useRef(null)

    useEffect(()=>{
    let counter = 1;
      let soundrepeat =  setInterval(async() => {
          if(counter > 1){
            clearInterval(soundrepeat)
            return false
          }
      await playSound(`Counter`)
        counter++
      }, 800);

      return ()=>{
        clearInterval(soundrepeat)
      }
    },[])
    useEffect(async () => {
     
        if (!currentUser) {
            notifyInfo('Bạn cần đăng nhập để vào học!')
            navigate('/auth')
        }

        if (questionData.length === 0) {

            notifyErorr('Không thể lấy câu hỏi vui lòng thử lại!')
            navigate('/learn')
        }
        if (questionData === undefined) {
            notifyErorr('Không thể lấy câu hỏi vui lòng thử lại!')
            navigate('/learn')
        }
        if (questions) {
            refQuestion.current = questionsReturn([...questions], task)

        }
        const isMobile = navigator.userAgentData.mobile
        if (isMobile) {
            let de = document.documentElement
            if (de.requestFullscreen) { de.requestFullscreen(); }
            else if (de.mozRequestFullScreen) { de.mozRequestFullScreen(); }
            else if (de.webkitRequestFullscreen) { de.webkitRequestFullscreen(); }
            else if (de.msRequestFullscreen) { de.msRequestFullscreen(); }

            window.screen.orientation.lock('landscape')
        }
        return () => {

            setQuizNumberCount(0)
        }
    }, [])
    const isLandScape = window.innerHeight > window.innerWidth


    //Timer

    const totalTime = 599

    const minutes = useRef(0)
    const sec = useRef(0)
    const counter = useSelector(state => state.quiz.time.counter)
    useEffect(() => {

        let timer = setInterval(() => {

            dispatch(timeIncrease())
            minutes.current = (Math.floor((totalTime - counter) / 60))
            sec.current = (totalTime - minutes.current * 60 - counter)


        }, 1000)
        if (counter > totalTime) {
            clearInterval(timer)
            setQuizNumberCount(12)
        }
        if (quizNumberCount > 10) {
            clearInterval(timer)

        }

        return () => {
            clearInterval(timer)
        }
    }, [counter])

    
    return (
        <>

        {playThemeSound && <audio className='hidden' autoPlay loop src="https://github.com/TCODEDAO/upload-an-image-chemiscare-user/blob/main/NhacNenChemiscare.mp3?raw=true"></audio>}
        
            {isLandScape === true ? <div className='requestRotate'>Bạn cần xoay ngang màn hình để hoc!</div> :
                <>

                    {quizNumberCount < 11 ? isCountDown ?
                        <div className={`bg-[#000000] h-screen w-screen text-white flex justify-center items-center `}>
                            <animated.span style={{

                                ...stylesloadingToGame
                            }
                            } className="text-9xl">
                                {renderNumber && renderNumber}
                            </animated.span>
                        </div>

                        : isQuizCount === false ? showQuizContainer((style, item) => item ?
                            <animated.div style={{
                                ...style
                            }} className='h-screen w-screen fixBgGame bg-no-repeat bg-cover bg-[#191a28] relative' >

                               
                                <ScoreComponent min={minutes.current} sec={sec.current} level={task} />
                                <div className="gradientBoxQuestion  flex justify-center">
                                    <div className='gradientBoxQuestionContent flex justify-center items-center'>
                                        <span className='text-white inline-block max-w-[500px] text-[16px] select-none' dangerouslySetInnerHTML={{ __html: refQuestion.current[quizNumberCount]?.content }}></span>
                                    </div>
                                </div>

                                <AnswerComponent 
                                nextQuestion={nextQuestion} 
                                quizNumberCount={quizNumberCount}
                                setQuizCorrectCount={setQuizCorrectCount}
                                quizCorrectCount={quizCorrectCount}
                                answerList={refQuestion?.current[quizNumberCount]?.answers} 
                                correctAnswer={refQuestion.current[quizNumberCount]?.correctAnswer} 
                                prevQuizCorrectCount={prevQuizCorrectCount}
                                setPrevQuizCorrectCount = {setPrevQuizCorrectCount}
                                />

                                <div className="progress">
                                    <div className="progress-done" style={{ width: `${quizNumberCount * 10}%` }} >
                                        {quizNumberCount !== 10 ? `${quizNumberCount * 10}%` : '99%'}
                                    </div>
                                </div>
                            </animated.div> : '') : showQuizCount((style, item) => item ? <animated.div style={style} className='h-screen w-screen fixBgGame bg-no-repeat bg-cover bg-[#191a28] flex justify-center relative'><span className=' absolute text-white text-8xl top-[30%]'>Câu: {quizNumberCount}</span></animated.div> : '')
                        : <EndComponent />}
                </>
            }
        </>

    )
}

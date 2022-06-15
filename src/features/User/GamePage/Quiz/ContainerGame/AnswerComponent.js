import React, {
    memo,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import { useDispatch } from 'react-redux'
import { socreIncrease } from '../../../../../redux/User/QuizSlice'


function AnswerComponent({ nextQuestion, answerList, correctAnswer }) {
    const dispatch = useDispatch()
    const [answerChoice, setAnswerChoice] = useState(null)

    useEffect(() => {
        let delayNextQuestion
        if (answerChoice) {
            const answerChoiceLowerCase =
                answerListRender.current[answerChoice].toLocaleLowerCase()
            const correctAnswerLowerCase = correctAnswer.toLocaleLowerCase()
            const isCorrectChoiceAnswer =
                answerChoiceLowerCase.localeCompare(correctAnswerLowerCase) ===
                0
            if (isCorrectChoiceAnswer) {
                dispatch(socreIncrease())
            }
            delayNextQuestion = setTimeout(() => {
                nextQuestion()
            }, 2000)
            return
        }

        return () => {
            clearTimeout(delayNextQuestion)
        }
    }, [answerChoice])
    const answerListRender = useRef(
        [...answerList]?.sort(() => Math.random() - 0.5),
    )

    useEffect(() => {
        const answerList = document.querySelectorAll('.cautraloi')
        answerList.forEach((answer, index) => {
            answer.innerHTML = answerListRender.current[index]
        })
    }, [])
    useLayoutEffect(() => {
        const answerChoiceInDom =
            document.querySelectorAll('.cautraloiduocchon')
        const answerChoiceLowerCase =
            answerListRender?.current[answerChoice]?.toLocaleLowerCase()
        const correctAnswerLowerCase = correctAnswer?.toLocaleLowerCase()

        if (answerChoice) {
            answerChoiceInDom.forEach((answerChoiceDom) => {
                // answerChoice.style.opacity = '0'
                // answerChoice.style.visibility = 'hiden'

                if (answerChoiceDom.getAttribute('data-id') == answerChoice) {
                    Object.assign(answerChoiceDom.style, {
                        opacity: '1',
                        visibility: 'visible',
                        background:
                            answerChoiceLowerCase?.localeCompare(
                                correctAnswerLowerCase,
                            ) === 0
                                ? '#2ecc71'
                                : '#e74c3c',
                    })
                } else {
                    Object.assign(answerChoiceDom.style, {
                        opacity: '0',
                        visibility: 'hiden',
                        zIndex: '-999',
                    })
                }
            })
        }
    }, [answerChoice])
    return (
        <div className="z-1 relative top-[38%] place-items-center w-screen grid grid-cols-[1fr_1fr]  responsiveAnswerBoxGroup gap-y-[10px]">
            <div
                className="cautraloiduocchon w-[308px] h-[104px] responsiveAnswerBox bg-gradient-to-br mx-6 my-2 from-[#00c6fb] inline-block to-[#005bea] z-[2] rounded-[48px] hover:cursor-pointer hover:opacity-80 transition-all duration-500 inline-block relative"
                data-id={0}
                onClick={(e) => {
                    setAnswerChoice(e.target.getAttribute('data-id'))
                }}
            >
                <span className='text-white font-["Roboto",sans-serif] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cautraloi select-none pointer-events-none'></span>
            </div>
            <div
                className="cautraloiduocchon w-[308px] h-[104px] responsiveAnswerBox bg-gradient-to-br mx-6 my-2 from-[#84fab0] inline-block to-[#8fd3f4] z-[2] rounded-[48px] hover:cursor-pointer hover:opacity-80 transition-all duration-500 inline-block relative"
                data-id={1}
                onClick={(e) => {
                    setAnswerChoice(e.target.getAttribute('data-id'))
                }}
            >
                <span className='text-white font-["Roboto",sans-serif] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cautraloi select-none pointer-events-none'></span>
            </div>
            <div
                className="cautraloiduocchon w-[308px] h-[104px] responsiveAnswerBox bg-gradient-to-br mx-6 my-2 from-[#CAC531] inline-block to-[#F3F9A7] z-[2] rounded-[48px] hover:cursor-pointer hover:opacity-80 transition-all duration-500 inline-block relative"
                data-id={2}
                onClick={(e) => {
                    setAnswerChoice(e.target.getAttribute('data-id'))
                }}
            >
                <span className='text-white font-["Roboto",sans-serif] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cautraloi select-none pointer-events-none'></span>
            </div>
            <div
                className="cautraloiduocchon w-[308px] h-[104px] responsiveAnswerBox bg-gradient-to-br mx-6 my-2 from-[#f093fb] inline-block to-[#f5576c] z-[2] rounded-[48px] hover:cursor-pointer hover:opacity-80 transition-all duration-500 inline-block relative"
                data-id={3}
                onClick={(e) => {
                    setAnswerChoice(e.target.getAttribute('data-id'))
                }}
            >
                <span className='text-white font-["Roboto",sans-serif] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] cautraloi select-none pointer-events-none'></span>
            </div>
        </div>
    )
}
export default memo(AnswerComponent)

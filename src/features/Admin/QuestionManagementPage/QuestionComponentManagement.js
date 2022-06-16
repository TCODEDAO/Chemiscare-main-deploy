import React, { lazy, useEffect, useState } from 'react'


import { useSelector, useDispatch } from 'react-redux/es/exports'

import { createAxios } from '../../../utils/axiosJWT'
import { createNewQuestion, getAllQuestion } from '../../../api/Admin/apiQuestion'
import { useNavigate } from 'react-router-dom'
import { notifyInfo } from '../../../components/Alert/AlertComponent'

const Navigation = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))

export default function QuestionComponentManagement() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth.login.currentUser)

    const axiosJWT = createAxios(currentUser, dispatch)
    const questions = useSelector(state => state?.questionManagement?.questionList)

    useEffect(() => {
        if (!currentUser || currentUser.isAdmin === false) {
            navigate('/auth')
            notifyInfo('Bạn cần đăng nhập để vào học!')
        }
        getAllQuestion(currentUser, dispatch, axiosJWT)
    }, [])

    const [contentQuestion, setContentQuestion] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer4, setAnswer4] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [grade, setGrade] = useState(Number)
    const [round, setRound] = useState(Number)
    const [task, setTask] = useState(Number)
    const [level, setLevel] = useState(Number)

    const handleSubmitData = async () => {
        const dataSend = {
            content: contentQuestion.trim(),
            description: '',
            answers: [answer1, answer2, answer3, answer4],
            correctAnswer: correctAnswer,
            grade: grade,
            round: round,
            task: task,
            level: level
        }
        await createNewQuestion(currentUser, axiosJWT, dataSend)
        await getAllQuestion(currentUser, dispatch, axiosJWT)

    }


    return (
        <div className='h-screen w-screen bg-[#ccc] overflow-hidden overflow-y-scroll'>
            <Navigation currentUser={currentUser} />

            <div className='mt-[96px] flex justify-center items-start overflow-y-scroll'>

                <ul>
                    {questions?.map(question => (
                        <li key={question?._id}>

                            <details >
                                <summary dangerouslySetInnerHTML={{ __html: question?.content }}></summary>
                                <p>Lớp {question?.grade}</p>
                                <p>Bài {question?.task}</p>
                                <p>Vòng {question?.round}</p>
                                <p>Cấp độ {question?.level}</p>
                                {question.answers.map((answer, index) => (
                                    <p key={index} dangerouslySetInnerHTML={{ __html: answer }}></p>
                                ))}
                            </details>
                        </li>
                    ))}
                </ul>

            </div>

            <div className='flex justify-center items-center my-[50px] '>

                <div className=''>
                    <h1 className='text-[40px]'>Xóa số 0 ở bên dưới để xem gợi ý</h1>
                    <label htmlFor="content-question" className='m-2 cursor-pointer'>Nội dung câu hỏi</label>

                    <input
                        className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6'
                        type="text" placeholder='Nhập câu hỏi, lưu ý công thức hóa học dùng thẻ html!'
                        id='content-question'
                        value={contentQuestion}
                        onChange={(e) => setContentQuestion(e.target.value)}
                    />

                    <label htmlFor="content-answers-1" className='m-2 cursor-pointer'>Câu trả lời 1</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' type="text" placeholder='Nhập câu trả lời, lưu ý công thức hóa học dùng thẻ html!' id='content-answers-1'
                        value={answer1}
                        onChange={(e) => setAnswer1(e.target.value)}
                    />

                    <label htmlFor="content-answers-2" className='m-2 cursor-pointer'>Câu trả lời 2</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' type="text" placeholder='Nhập câu trả lời, lưu ý công thức hóa học dùng thẻ html!' id='content-answers-2' value={answer2}
                        onChange={(e) => setAnswer2(e.target.value)} />

                    <label htmlFor="content-answers-3" className='m-2 cursor-pointer'>Câu trả lời 3</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' type="text" placeholder='Nhập câu trả lời, lưu ý công thức hóa học dùng thẻ html!' id='content-answers-3'
                        value={answer3}
                        onChange={(e) => setAnswer3(e.target.value)}
                    />

                    <label htmlFor="content-answers-4" className='m-2 cursor-pointer'>Câu trả lời 4</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' type="text" placeholder='Nhập câu trả lời, lưu ý công thức hóa học dùng thẻ html!' id='content-answers-4' value={answer4}
                        onChange={(e) => setAnswer4(e.target.value)} />

                    <label htmlFor="correct-answer" className='m-2 cursor-pointer'>Câu trả lời <strong>đúng</strong> </label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' type="text" placeholder='Nhập câu trả lời, lưu ý công thức hóa học dùng thẻ html!' id='correct-answer'
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)} />
                    <label htmlFor="grade" className='m-2 cursor-pointer'>Khối</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' placeholder='Nhập số 8 hoặc 9 không cần số 0 đứng trước' type="number" min="8" max="9" id='grade' value={grade} onChange={(e) => setGrade(e.target.value)} />

                    <label htmlFor="round" className='m-2 cursor-pointer'>Vòng</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' placeholder='Nhập vòng, có 3 vòng tạm thời,  nhập số vòng mà người dùng sẽ gặp câu hỏi này' type="number" min="1" max="3" id='round' value={round} onChange={(e) => setRound(e.target.value)} />


                    <label htmlFor="task" className='m-2 cursor-pointer'>Bài</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' placeholder='Nhập số bài, có 3 bài tạm thời, nhập số bài mà người dùng sẽ gặp câu hỏi này, xếp theo độ khó(mày thấy câu nào dài đọc khó thì cho bài 3 giảm dần về bài 1)' type="number" min="1" max="3" id='task' value={task} onChange={(e) => setTask(e.target.value)} />

                    <label htmlFor="level" className='m-2 cursor-pointer'>Cấp độ</label>
                    <input className='outline-none min-w-[500px] w-full p-4 border-solid border-2 border-gray-700 rounded-xl mb-6' placeholder='Nhập số bài, có 3 cấp, nhập cấp mà người dùng sẽ gặp câu hỏi này, xếp theo độ khó(mày thấy câu nào dài đọc khó thì cho 3 giảm dần về  1)' type="number" min="1" max="3" id='level' value={level} onChange={(e) => setLevel(e.target.value)} />
                    <div className='flex justify-center items-center flex-col'>  <p>Bài 1 khoảng 10 câu, bài 2 10 câu, bài 3 10 câu</p>

                        <p><strong> Thank you</strong></p>
                        <button onClick={handleSubmitData} className='px-10 py-4 rounded-[20px] bg-black text-white hover:opacity-60'>Gửi câu hỏi</button></div>

                </div>

            </div>
            <Footer />
        </div>
    )
}

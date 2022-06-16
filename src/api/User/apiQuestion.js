import { notifyErorr, notifySuccess } from "../../components/Alert/AlertComponent"
import { getQuestionFailed, getQuestionSuccess, setResult } from "../../redux/User/QuizSlice"


const getQuestionAndAnswers = async (currentUser, dispatch, axiosJWT, navigate) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/questions/${currentUser?.detailUserInfomation?.grade}`,
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        dispatch(getQuestionSuccess(res.data))

    } catch (err) {
        console.log(err)
        notifyErorr('Có lỗi xảy ra khi lấy câu hỏi, vui lòng thử lại!')
        dispatch(getQuestionFailed())
        navigate('/learn')
    }
}

const createUserLearningProcess = async (currentUser, axiosJWT) => {
    try {
        await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result/${currentUser?._id}`, {
            userId: currentUser?._id
        }, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
    } catch (err) {
        console.log(err)
    }

}
const getResultQuizById = async (currentUser, dispatch, axiosJWT) => {
    try {
        const res = await axiosJWT.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/resultById/${currentUser._id}`,
            currentUser._id,
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        dispatch(setResult(res.data))

    } catch (err) {
        notifyErorr("Lấy kết quả không thành công!")
    }
}
const createNewResultQuiz = async (currentUser, axiosJWT, data) => {

    try {
        axiosJWT.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result`,
            {
                userId: currentUser._id,
                isCompleteRender: true,
                ...data,
            },
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        notifySuccess('Lưu kết quả thành công!')
    } catch (err) {
        notifyErorr('Lưu kết quả không thành công!')

    }
}



export { getQuestionAndAnswers, createUserLearningProcess, createNewResultQuiz, getResultQuizById, }

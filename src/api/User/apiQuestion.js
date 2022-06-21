import { notifyErorr, notifySuccess } from "../../components/Alert/AlertComponent"
import { getQuestionFailed, getQuestionSuccess, setHistoryResult, setResult, setRound } from "../../redux/User/QuizSlice"


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
const getResultQuizById = async (currentUser, dispatch, axiosJWT, currentRound) => {

    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result/${currentUser._id}`,

            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )

        dispatch(setResult(await res.data.result.filter(result => result.round === currentRound)))

    } catch (err) {
        console.log(err)
        notifyErorr("Lấy kết quả không thành công, vui lòng tải lại trang!")
    }
}
const getAllResultQuizById = async (currentUser, dispatch, axiosJWT) => {

    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result/${currentUser._id}`,

            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )

        dispatch(setHistoryResult(await res.data.result))

    } catch (err) {
        console.log(err)
        notifyErorr("Lấy kết quả không thành công, vui lòng tải lại trang!")
    }
}
const getRound = async (dispatch, axiosJWT, currentUser) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result/learningProcess/${currentUser._id}`,

            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        await getResultQuizById(currentUser, dispatch, axiosJWT, res?.data?.process?.currentRound)
        await dispatch(setRound(res?.data?.process?.currentRound))
    } catch (err) {
        notifyErorr('Lấy tiến trình học không thành công, vui lòng tải lại trang!')
    }
}
const increaseRound = async (dispatch, axiosJWT, currentUser, currentRound) => {
    try {
        const res = await axiosJWT.patch(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result/learningProcess/round/${currentUser._id}`, {
            round: currentRound + 1
        },

            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        notifySuccess('Nộp bài thành công!')
        await dispatch(setRound(res?.data?.data?.currentRound))
        await getResultQuizById(currentRound, dispatch, axiosJWT, res?.data?.data?.currentRound)
        window.location.reload()
    } catch (err) {
        notifyErorr('Nộp bài không thành công, vui lòng tải lại trang!')
    }
}
const createNewResultQuiz = async (currentUser, axiosJWT, data) => {

    try {
        await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result`,
            {
                userId: currentUser._id,
                ...data,
            },
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            })
        notifySuccess('Lưu kết quả thành công!')
    } catch (err) {
        console.log(err)
        notifyErorr('Lưu kết quả không thành công!')

    }
}



export { getQuestionAndAnswers, createUserLearningProcess, createNewResultQuiz, getResultQuizById, getRound, increaseRound, getAllResultQuizById }

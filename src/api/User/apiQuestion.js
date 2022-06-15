import { notifyErorr } from "../../components/Alert/AlertComponent"
import { getQuestionFailed, getQuestionSuccess } from "../../redux/User/QuizSlice"


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

// const getResultQuiz = async (currentUser, dispatch, axiosJWT) => {
//     try {
//         const res = await axiosJWT.post(
//             `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/resultById/${currentUser._id}`,
//             currentUser._id,
//             {
//                 headers: { token: `Bearer ${currentUser?.accessToken}` },
//             },
//         )

//         dispatch(completeQuizRoundTrue(res.data))
//     } catch (err) { }
// }
// const createNewResultQuiz = async (currentUser, dispatch, axiosJWT, data) => {
//     dispatch(newResultQuizStart())
//     try {
//         axiosJWT.post(
//             `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/result`,
//             {
//                 userId: currentUser._id,
//                 isComplete: true,
//                 ...data,
//             },
//             {
//                 headers: { token: `Bearer ${currentUser?.accessToken}` },
//             },
//         )
//         dispatch(newResultQuizSuccess())
//         dispatch(completeQuizRoundTrue(currentUser?._id))
//     } catch (err) {
//         dispatch(newResultQuizFailed())
//     }
// }

// //Admin
// const getAllQuestion = async (currentUser, dispatch, axiosJWT) => {
//     dispatch(adminGetQuestionStart())
//     try {
//         const res = await axiosJWT.get(
//             `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/questions/`,
//             {
//                 headers: { token: `Bearer ${currentUser?.accessToken}` },
//             },
//         )
//         dispatch(adminGetQuestionSuccess(res.data.question))
//         notifySuccess(res.data.message)
//     } catch (err) {
//         dispatch(adminGetQuestionFailed(err))
//         notifyErorr(err.response.data.message)


//     }
// }
// const createNewQuestion = async (currentUser, dispatch, axiosJWT, data) => {
//     try {
//         const res = await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/questions/create-question`, data, {
//             headers: { token: `Bearer ${currentUser?.accessToken}` },
//         })
//         notifySuccess("Thêm câu hỏi thành công")

//     } catch (err) {
//         console.log(err)
//         notifyErorr("Thêm câu hỏi thất bại")
//     }
// }
export { getQuestionAndAnswers }

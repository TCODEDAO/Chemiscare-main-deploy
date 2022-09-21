import { notifyErorr, notifySuccess } from "../../components/Alert/AlertComponent"
import { adminGetQuestionFailed, adminGetQuestionStart, adminGetQuestionSuccess } from "../../redux/Admin/QuestionManagementSlice"

const getAllQuestion = async (currentUser, dispatch, axiosJWT) => {
    dispatch(adminGetQuestionStart())
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/questions/`,
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        dispatch(adminGetQuestionSuccess(res.data.question))
        notifySuccess(res.data.message)
    } catch (err) {
        dispatch(adminGetQuestionFailed(err))
        notifyErorr(err.response.data.message)


    }
}
const createNewQuestion = async (currentUser, axiosJWT, data) => {
    try {
         await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/questions/create-question`, data, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        notifySuccess("Thêm câu hỏi thành công")

    } catch (err) {
        console.log(err)
        notifyErorr("Thêm câu hỏi thất bại")
    }
}

export { getAllQuestion, createNewQuestion }
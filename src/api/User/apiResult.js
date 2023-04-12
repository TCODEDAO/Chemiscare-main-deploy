import { notifyErorr } from "../../components/Alert/AlertComponent"
import { setResultAllUser } from "../../redux/User/QuizSlice"


const getAllResultAndSort = async (axiosJWT, currentUser, dispatch) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })

        dispatch(setResultAllUser(res.data.data))
    } catch (err) {
        notifyErorr('Lấy dữ liệu người dùng không thành công vui lòng thử lại!')
    }



}

export { getAllResultAndSort }
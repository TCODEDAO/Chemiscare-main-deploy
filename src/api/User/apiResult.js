import { notifyErorr } from "../../components/Alert/AlertComponent"
import { setResultAllUser } from "../../redux/User/QuizSlice"


const getAllResultAndSort = async (axiosJWT, dispatch) => {
    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/result`)

        dispatch(setResultAllUser(res.data.data))
    } catch (err) {
        notifyErorr('Lấy dữ liệu người dùng không thành công vui lòng thử lại!')
    }



}

export { getAllResultAndSort }
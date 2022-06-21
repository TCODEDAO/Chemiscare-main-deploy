import axios from 'axios'
import { notifyErorr } from '../../components/Alert/AlertComponent'
import { getPostFailed, getPostStart, getPostSuccess, } from '../../redux/User/PostSlice'

const getAllPost = async (currentUser, dispatch, axiosJWT) => {
    dispatch(getPostStart())
    try {

        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/approved`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })

        dispatch(getPostSuccess(res.data.data))
    } catch (err) {
        dispatch(getPostFailed())
        notifyErorr(err.response.data.message)
    }
}
const createPostUser = async (currentUser, dispatch, axiosJWT) => {
    try {

    } catch (err) {

    }
}
export { getAllPost }
import axios from 'axios'
import { notifyErorr, notifySuccess } from '../../components/Alert/AlertComponent'
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from '../../redux/User/AuthSlice'
import { createUserLearningProcess } from './apiQuestion'


const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/login`,
            user, { withCredentials: true }
        )
        dispatch(loginSuccess(res.data))
        notifySuccess(res.data.message)
        navigate('/learn')
    } catch (err) {
        dispatch(loginFailed())
        notifyErorr(err.response.data.message)
    }
}
const registerUser = async (user, dispatch) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/register`,
            user,
        )
        dispatch(registerSuccess())
        notifySuccess(res.data.message)

    } catch (err) {
        dispatch(registerFailed())
        notifyErorr(err.response.data.message)

    }
}
const logOutUser = async (dispatch, navigate, accessToken, axiosJWT, id) => {
    dispatch(logOutStart())
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/logout`,
            id,
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        )

        await dispatch(logOutSuccess())
        navigate('/')
    } catch (err) {
        dispatch(logOutFailed())
    }
}

const updateDetailInfomation = async (dispatch, navigate, axiosJWT, currentUser, data) => {
    try {

        const res = await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/detail/${currentUser?._id}`, data, { headers: { token: `Bearer ${currentUser?.accessToken}` } })
        const dataResponse = res.data
        const { isSuccess, message } = dataResponse
        const newUser = { ...dataResponse.user }

        await createUserLearningProcess(currentUser, axiosJWT)

        await dispatch(loginSuccess({ ...newUser, accessToken: currentUser?.accessToken }))
        notifySuccess(res.data.message)
        setTimeout(() => { navigate('/learn') }, 1000)
    } catch (err) {
        console.log(err)
        notifyErorr(err)
        navigate('/auth')
    }
}
export { registerUser, loginUser, logOutUser, updateDetailInfomation }

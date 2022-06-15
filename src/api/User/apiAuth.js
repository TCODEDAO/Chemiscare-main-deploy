import axios from 'axios'
import { notifyErorr, notifySuccess } from '../../components/Alert/AlertComponent'
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess } from '../../redux/User/AuthSlice'


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
// const detailUserInfomation = async (
//     dispatch,
//     navigate,
//     accessToken,
//     axiosJWT,
//     id,
//     data,
// ) => {
//     try {
//         const res = await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/detailUser`, {
//             userId: id,
//             ...data
//         }, {
//             headers: { token: `Bearer ${accessToken}` },

//         })

//         await axiosJWT.put(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/userDetailUpdate`, {
//             detailId: res.data.detailId,
//             userId: id
//         }, { headers: { token: `Bearer ${accessToken}` } })
//         // dispatch(updateDetailInfoSuccess())
//         dispatch(loginRequireLearnPage('Vui lòng đăng nhập lại để hoàn thành cập nhật thông tin!'))
//         navigate('/auth')
//     } catch (err) {
//         dispatch(loginRequireLearnPage('Có lỗi xảy ra, xin hãy thử đăng nhập lại!'))
//         navigate('/auth')

//         // dispatch(updateDetailInfoFailed())
//     }
// }
export { registerUser, loginUser, logOutUser }

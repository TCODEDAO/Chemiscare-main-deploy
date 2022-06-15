import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { loginSuccess } from '../redux/User/AuthSlice'

const refreshToken = async () => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/refresh`,
            {
                withCredentials: true,
            },
        )
        return res.data
    } catch (err) {
        console.log(err)
    }
}
export const createAxios = (currentUser, dispatch, statusSuccess) => {
    const newInstance = axios.create()
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date()
            const decodedToken = jwt_decode(currentUser?.accessToken)

            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken()
                const refreshUser = {
                    ...currentUser,
                    accessToken: data.accessToken,
                }
                dispatch(loginSuccess(refreshUser))

                config.headers['token'] = 'Bearer ' + data.accessToken
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        },
    )
    return newInstance
}


import axios from 'axios'
import { notifyErorr, notifySuccess } from '../../components/Alert/AlertComponent'
import { adminGetPostsSuccess, adminGetThreadSuccess } from '../../redux/Admin/ForumManagementSlice'
import { addPostSuccess, getPostFailed, getPostStart, getPostSuccess, getThreadSuccess, } from '../../redux/User/PostSlice'
import { setComments, setCountComments } from '../../redux/User/ReactionSlice'


const getAllPost = async (currentUser, dispatch, axiosJWT) => {
    try {

        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })

        dispatch(adminGetPostsSuccess(res.data.data?.filter(data => data.isApproved === false)))
    } catch (err) {
        notifyErorr(err.response.data.message)
    }
}

const getAllPostApproved = async (dispatch) => {
    dispatch(getPostStart())
    try {

        const res = await axios.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/approved`)

        dispatch(getPostSuccess(res.data.data))
    } catch (err) {
        dispatch(getPostFailed())
        notifyErorr(err.response.data.message)
    }
}

const getPostById = async (dispatch, id, navigate, page) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/${id}`)
        const comments = await axios.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/reaction/comments/${id}?limit=${(page || 1) * 5}`,)
        const commentReply = comments.data.comments.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.reply.length
        }, 0)
        const allCommentAndReplyCount = comments?.data?.length + commentReply
        dispatch(setCountComments(allCommentAndReplyCount))
        dispatch(setComments(comments.data.comments))
        dispatch(addPostSuccess(res.data.data))
    } catch (err) {
        notifyErorr(err.response.data.message)
        navigate('/forum')
    }
}
const getPostBySlug = async (dispatch, slug, navigate, page) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/seo/${slug}`)
        const comments = await axios.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/reaction/comments/${res.data.data._id}?limit=${(page || 1) * 5}`,)
        const commentReply = comments.data.comments.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.reply.length
        }, 0)
        const allCommentAndReplyCount = comments?.data?.length + commentReply
        dispatch(setCountComments(allCommentAndReplyCount))
        dispatch(setComments(comments.data.comments))
        dispatch(addPostSuccess(res.data.data))
        console.log('api get ', res.data.data)
    } catch (err) {
        notifyErorr(err.response.data.message)
        navigate('/forum')
    }
}
// const editPost = async (currentUser, axiosJWT, postId, data) => {
//     try {
//         const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/edit/${postId}`, data, {
//             headers: { token: `Bearer ${currentUser?.accessToken}` },
//         })
//         console.log(res);
//     } catch (err) {
//         console.log(err);
//         notifyErorr('ok')
//     }
// }

const getAllThreadApproved = async (dispatch) => {
    try {

        const res = await axios.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/thread/approved`)

        dispatch(getThreadSuccess(res.data.data))
    } catch (err) {

        notifyErorr(err.response.data.message)
    }
}
const getAllThread = async (currentUser, dispatch, axiosJWT) => {

    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/thread/`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        dispatch(adminGetThreadSuccess(res.data.data?.filter(data => data.isApproved === false)))
    } catch (err) {
        notifyErorr(err.response.data.message)


    }
}


const createPostUser = async (currentUser, socket, axiosJWT, data) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts`, data, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })

        notifySuccess(res.data.message)
        socket.emit('CreateThreadAndSendToAdminFromClient', res.data.data)
    } catch (err) {
        notifyErorr(err.response.data.message)
    }
}

const adminAprrovedThread = async (currentUser, axiosJWT, id, socket) => {
    try {
        const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/thread/approved/${id}`, currentUser, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        socket.emit('ApprovedSuccessThreadAdmin', res.data)
    } catch (err) {
        notifyErorr(err.response.data.message)

    }
}


const adminDeleteThread = async (currentUser, axiosJWT, id, socket) => {
    try {
        const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/thread/delete/${id}`, currentUser, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        socket.emit('RemoveSuccessThreadAdmin', res.data)
    } catch (err) {
        notifyErorr(err.response.data.message)

    }
}
const adminDeleteThreadReal = async (currentUser, axiosJWT, id, socket) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/thread/${id}`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        socket.emit('RemoveSuccessThreadAdminReal', res.data)
    } catch (err) {
        notifyErorr(err.response.data.message)

    }
}



const adminAprrovedPost = async (currentUser, axiosJWT, id, socket) => {
    try {
        const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/${id}`, currentUser, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        socket.emit('ApprovedSuccessPostAdminFromClient', res.data)
    } catch (err) {
        notifyErorr(err.response.data.message)

    }
}

const adminDeletePost = async (currentUser, axiosJWT, id, socket) => {
    try {
        const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/delete/${id}`, currentUser, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        socket.emit('RemoveSuccessPostAdminFromClient', res.data)
    } catch (err) {
        notifyErorr(err.response.data.message)

    }
}
const adminDeletePostReal = async (currentUser, axiosJWT, id, socket) => {
    try {
        const res = await axiosJWT.delete(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/forum/posts/${id}`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        socket.emit('RemoveSuccessPostAdminReal', res?.data)
    } catch (err) {
        notifyErorr(err.response.data.message)

    }
}
export { getAllPostApproved, getAllPost, getAllThreadApproved, getAllThread, adminAprrovedThread, adminDeleteThread, adminDeleteThreadReal, createPostUser, adminAprrovedPost, adminDeletePost, adminDeletePostReal, getPostById, getPostBySlug }
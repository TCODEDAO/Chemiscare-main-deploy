import { toast } from "react-toastify"


const notifySuccess = (content) =>
    toast.success(` ${content}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
const notifyWarn = (content) =>
    toast.warn(` ${content}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
const notifyInfo = (content, time) =>
    toast.info(` ${content}`, {
        position: 'top-right',
        autoClose: time || 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
const notifyErorr = (content) =>
    toast.error(` ${content}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    })
const notifyWelcome = (content) => toast(`👋 ${content}`, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
})

export { notifySuccess, notifyWarn, notifyInfo, notifyErorr, notifyWelcome }

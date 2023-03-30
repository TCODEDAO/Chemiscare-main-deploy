import io from 'socket.io-client'


const socket = io("https://chemiscare-backend.onrender.com", {
    transports: ['websocket', 'polling', 'flashsocket']
})
export default socket

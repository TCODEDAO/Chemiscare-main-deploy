import io from 'socket.io-client'


const socket = io("http://192.168.1.103:3000", {
    transports: ['websocket', 'polling', 'flashsocket']
})
export default socket

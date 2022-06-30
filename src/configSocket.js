import io from 'socket.io-client'


const socket = io("https://chemiscare-backend-test.herokuapp.com", {
    transports: ['websocket', 'polling', 'flashsocket']
})
export default socket

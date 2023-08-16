const socketController = (socket: any) => {

    socket.on('send-message', (payload: any) => {
        console.log('execute socket')
    })


}


module.exports = {
    socketController
}
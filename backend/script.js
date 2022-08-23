const socket = io('http://localhost:3000/message')

socket.on('chat-message', data =>{
    console.log(data)
})
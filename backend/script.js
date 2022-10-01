const FrontendLink = require("./Refferences/Refferences")


const socket = io(`${FrontendLink}/message`)

socket.on('chat-message', data =>{
    console.log(data)
})
require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')

const {addUser, getUser, getUsersInRoom, totalUsers, removeUser} = require('./src/user')

const app = express()
const server =  require('http').createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
app.use(express.static('public'))

// Message generator
const genMsg =(username, text )=> {
    return {
        text,
        createdAt: new Date().getTime(),
        username
    }
}


//  WebSocket connection
io.on('connection', socket => {
    console.log('New client connected; Socket id: ' + socket.id)

    socket.on('join', (options, callback) => {
        const { err, user } = addUser({ id: socket.id, ...options })
        if(err) {
            return callback(err)
        }
        socket.join(user.room)
        socket.emit('message', genMsg('Admin', 'Welcome!!!!'))
        socket.broadcast.to(user.room).emit('message', genMsg('Admin', `${user.username} has joined!!`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room),
            userCount: totalUsers(user.room)
        })
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', genMsg(user.username, message))
        // callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', genMsg('Admin', `${user.username} has left.`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room),
                userCount: totalUsers(user.room)
            })
        }
    })
})

server.listen(port, () => {   // Changed from app.listen to server.listen 
    console.log(`Server is running on port ${port}`)
})
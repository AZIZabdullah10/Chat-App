const users = []

const addUser = ({id, username, room}) => {
    if(!username || !room){
        return {err: "Username and room is required!"}
    }
    room = room.trim().toLowerCase()
    const userExists = users.find(user => {
        return user.room.trim().toLowerCase() === room.trim().toLowerCase() && user.username.trim().toLowerCase() === username.trim().toLowerCase()
    })
    if (userExists) {
        return {
            err: 'Username is already in use!'
        }
    }

    const user = {id, username, room}
    users.push(user)
    return {user}
}

const getUser = (id) => {
    return  users.find(user => user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room.trim().toLowerCase() === room)
}

const totalUsers = (room) => {
    room = room.trim().toLowerCase()
    const totalUser = users.filter(user => user.room.trim().toLowerCase() === room)
    return totalUser.length
}

const removeUser = (id) => {
    const index = users.findIndex(user => {
        return user.id === id
    })
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

module.exports = {
    addUser,
    getUser,
    getUsersInRoom,
    totalUsers,
    removeUser
};
const socket = io() 

const msg = document.querySelector('#msg')
const msgTemplate = document.querySelector('#msg-template').innerHTML
const form = document.querySelector('#message-form')
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
const sidechat = document.querySelector('.side-chat')

const url = new URL(location.href);
const username = url.searchParams.get('username')
const room = url.searchParams.get('room')

socket.on('connect', () => {
    console.log('Connected to server')
})

socket.emit('join', {username, room}, (err) => {
    if(err) {
        alert(err)
        location.href = '/'
    }
})

socket.on('message', message => {
    console.log(message.text);
    const html = Mustache.render(msgTemplate, { //It's a client-side HTML template for rendering chat messages with Mustache.js
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
        username: message.username
    })
    msg.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

const  autoScroll = () => {
    const newMsgElement = msg.lastElementChild
    const newMsgStyle = getComputedStyle(newMsgElement)
    const newMsgMargin = parseInt(newMsgStyle.marginBottom)
    const newMsgHight = newMsgElement.offsetHeight + newMsgMargin

    const visualHeight = msg.offsetHeight
    const contentHeight = msg.scrollHeight

    const scrollOffset = msg.scrollTop + visualHeight

    if(contentHeight - newMsgHight <= scrollOffset){
        msg.scrollTop = msg.scrollHeight
    }
    console.log('autoscrool');
}

form.addEventListener('submit', e => {
    console.log('form submit');
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (err) => {
        if(err) {
            return console.log(err)
        }
    })
    e.target.elements.message.value = ''
    e.target.elements.message.focus()
})

//  sidebar
socket.on('roomData', ({ room, users, userCount }) => {
    console.log(users);
    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
        userCount
    })
    sidechat.innerHTML = html
})
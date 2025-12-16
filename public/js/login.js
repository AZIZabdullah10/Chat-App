const form  = document.querySelector('form')

form.addEventListener('submit', e => {
    e.preventDefault()
    const username = e.target.elements.username.value
    const room = e.target.elements.room.value
    location.href = `chat.html?username=${username}&room=${room}`
})
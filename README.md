Project name: Chat APP

Website: https://aziz-chat-app.onrender.com/

Description: It's a chat app or a real-time communication app that uses web sockets to transfar data in real time. When you open the app, it first asks you about the display name you want to use and the room name. After submitting the information, you will be taken to the chat room you selected. In the chat interface, members of that room and the room name is desplayed. You can chat with other users who selected the same room in real time.

Tools/Languages: HTML, SCSS, JavaScript, Mustache.js, Node.js, Socket.io, Express.js, and dotenv

Steps to build and run:

1. First, I created an Express.js server integrated with socket.io

2. Then I created a Socket.io event listener using io.on() and listened for “connection”. And in there, I wrote all the server-side socket.io code.

3. I wrote the HTML and CSS code for the frontend, and in the JavaScript file of the chat.html called chat.js, I wrote the frontend code for socket.io

4. In chat.js, I wrote the socket.io method called emit and emitted the event name “join” along with data for the username and the room name I parsed from the URL.

5. In server.js, I wrote the event listener using the io.on() to listen for the “join” event and collect the username and room name. Then store the username and room name in the Users array using the addUser() function imported from user.js and emit “roomData” event along with room, user, and user count.

6. Then, in chat.js, I wrote the “message” eventlistener and displayed the received message from the server on the chat room using Mustache.js template.

7. I also wrote the “sendMessage” event that emits messages collected from the text input field when the form is submitted to the server.

8. Then I wrote the eventlistener for “sendMessage” and collected the message of that user and broadcast it to other users of the room using io.to(user.room).emit('message', genMsg(user.username, message)). Then the “message” event listener of the other users will receive the data and display it on their screen.

9. In chat.js, I wrote the eventlister for “roomData” and displayed the room name and room memebers name ,by using the getUserInRoom() function, in the side-chat component using Mustache.js

10. In user.js I wrote the functions getUserInRoom() for getting all the users' data in the same room from the users array, getUser() to find the relevant user data, and removeUser() to remove a user from the users array.

11. Then in server.js, I wrote the event listener for “disconnect” and user removeUser() to remove the user from the users array and emit “message” about that user leaving.

12. Then I made the index.html, index.css, and login.js that contain the code for the home page of the Express.js server, and it contains a form to collect the display name or the username and the room name. Then, upon submitting the form, it redirects you to the chat room using location.href

13. Then I run the code using node server.js in the cmd, and the server will run on localhost:3000

Challenges:

1. Integrating Socket.io with Express.js

2. User management: In order to keep track of the users, I had to create a separate file called user.js and store all the data, delete user data, and get the user data

3. Autoscroll: When there are a lot of chat templates, In order to see the latest message, there is a need for auto scroll to the latest HTML element. But when i wrote the javascript code for auto scroll it only works for the chat container. After that i doesnt auto scroll, and i had to manually auto scroll to see the latedt message.

4. (Mineor problem) Parsing username and room name from the url

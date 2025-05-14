import dotenv from 'dotenv'
import dbConnection from './db/index.js';
import http from 'http';
import { Server as socketIo } from 'socket.io';
dotenv.config() // dotenv.config() is used to load environment variables from a .env file into process.env (an object)in a Node.js application.
import app from './app.js';
const server = http.createServer(app);
const io = new socketIo(server);

// Socket Connection starts ------------------------------------------------------------


const userSocketMap = {};
const getClientsInRoom = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                userName: userSocketMap[socketId]
            }
        }
    );
}
io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`);
    socket.on('join-room', ({roomId, userName}) => {
       userSocketMap[socket.id] = userName;
       socket.join(roomId);
       const clientsInRoom = getClientsInRoom(roomId);
       console.log(clientsInRoom)
       // Now we need to send this information to all the clients in the room
       clientsInRoom.forEach(({socketId}) => {
        io.to(socketId).emit('clients-in-room', {
            clientsInRoom,
            userName,
            socketId: socket.id
        });
       });
    });

    // Add code sharing events
    socket.on('code-change', ({ roomId, code, language }) => {
        socket.to(roomId).emit('code-update', {
            code,
            language,
            userName: userSocketMap[socket.id]
        });
    });

    socket.on('cursor-position', ({ roomId, position, userName }) => {
        socket.to(roomId).emit('cursor-update', {
            position,
            userName,
            socketId: socket.id
        });
    });

    socket.on('disconnecting', () => {
       const rooms = [...socket.rooms];
       rooms.forEach((roomId) => {
        socket.to(roomId).emit('user-disconnected', {
            socketId: socket.id,
            userName: userSocketMap[socket.id]
        });
       });
       delete userSocketMap[socket.id];
       socket.leave();
       console.log('user disconnected', socket.id);
    })
});


// Socket Connection ends ------------------------------------------------------------

dbConnection()
    .then(() => { console.log('Db connected') })
    .catch((err) => { console.log('error while connecting to db', err) })

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.listen(3000, () => {
    console.log('App is listening on the port', 3000)
})

app.get('/', (req, res) => { res.send('HELLO JIIIIIIIIIIIII') })
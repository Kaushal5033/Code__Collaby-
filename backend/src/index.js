import dotenv from 'dotenv'
import dbConnection from './db/index.js';
import http from 'http';
import { Server as socketIo } from 'socket.io';
dotenv.config() // dotenv.config() is used to load environment variables from a .env file into process.env (an object)in a Node.js application.
import app from './app.js';
const server = http.createServer(app);
const io = new socketIo(server);


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
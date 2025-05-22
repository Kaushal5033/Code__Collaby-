import dotenv from 'dotenv'
import dbConnection from './db/index.js';
dotenv.config() // dotenv.config() is used to load environment variables from a .env file into process.env (an object)in a Node.js application.
import app from './app.js';
import server from './socket.js';


dbConnection()
    .then(() => { console.log('Db connected') })
    .catch((err) => { console.log('error while connecting to db', err) })

const PORT = process.env.PORT

// app.listen(PORT, () => {
//     console.log('App is listening on the port', PORT)
// })

app.get('/', (req, res) => { res.send('Welcome to Code Collaby') })
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
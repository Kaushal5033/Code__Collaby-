import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(cookieParser())
app.use(urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(express.json({ limit: '16kb' }))

export default app
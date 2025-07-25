import express from 'express'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import { connectDB } from './lib/db.js'
import cookieParser from "cookie-parser"
import cors from "cors"
import {app,server} from "./lib/socket.js"

import path from "path"


dotenv.config()


//Reads the .env file
const PORT = process.env.PORT

const __dirname = path.resolve()



//app.use() is a method in Express.js that lets you add middleware 
//to your application. Middleware functions are like checkpoints 
// that run during the request-response cycle. They can log data, 
// modify requests, handle errors, or even serve static files
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", //Specifies which frontend is allowed to make requests to your backend
    credentials: true,
  })
);

//- It tells Express to automatically parse incoming JSON in the req body.
//- Once parsed, the data becomes available as req.body in your route handlers.
app.use(express.json())


// /api/auth/signup
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}



server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
    connectDB()
})
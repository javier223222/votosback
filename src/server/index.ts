import express,{Express,json,Request,Response} from "express"
import cors from "cors"
import dotenv from "dotenv"

import http from "http"
import fileUpload from "express-fileupload"
import root from "../routes"

dotenv.config()
const app:Express=express()
const server=http.createServer(app)
const PORT=process.env.PORT||3000
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./uploads"
}))

app.get("/",(req:Request,res:Response)=>{
    res.status(200).send(`<h1>bienvenidos</h1>`)
})
app.use("/api",root)


export default server
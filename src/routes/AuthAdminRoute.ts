import bodyParser from "body-parser"
import express,{Request,Response} from "express"
import AuthAdmin from "../controllers/AuthAdmin"
import Admin from "../domain/interfaces/IAdmin"
let jsonparser=bodyParser.json()
let authrouter=express.Router()
authrouter.route("/login")
          .post(jsonparser,async(req:Request,res:Response)=>{
                try{
                    const email=req.body.email
                    const password=req.body.password
                    const authadmin=new AuthAdmin()
                    const token=await authadmin.login(email,password)
                    res.status(200).json({token:token})
                }catch(e:any){
                    res.status(500).json({message:"error interno"})
                }
          })

authrouter.route("/register")
           .post(jsonparser,async(req:Request,res:Response)=>{
                try{
                    const {username,email,password,nombre,apellido,namerole}=req.body
                    const admin:Admin={
                        username:username,
                        email:email,
                        password:password,
                        nombre:nombre,
                        idRol:0,
                        apellido:apellido
                    }
                    const authadmin=new AuthAdmin()
                    const result=await authadmin.register(admin,namerole)
                    res.status(200).json(result)
                }catch(e:any){
                    res.status(500).json({message:"error interno"})
                }
           })

export default authrouter
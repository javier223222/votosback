import bodyParser from "body-parser"
import express,{Request,Response} from "express"
import AuthUser from "../controllers/AuthUsers"
import IUser from "../domain/interfaces/IUser"



let jsonparser=bodyParser.json()

let authuser=express.Router()



authuser.route("/login")
          .post(jsonparser,async(req:Request,res:Response)=>{
                try{
                    const email=req.body.email
                    const password=req.body.password
                    const authuser=new AuthUser()
                    const token=await authuser.login(email,password)
                    res.status(200).json({token:token})
                }catch(e:any){
                    res.status(500).json({message:"error interno"})
                }
          })


 authuser.route("/register")
              .post(jsonparser,async(req:Request,res:Response)=>{
                    try{
                        
                        const {name,email,password,apellidos}=req.body
                        const user:IUser={
                            name:name,
                            email:email,
                            password:password,
                            apellidos:apellidos
                        }

                        const authuser=new AuthUser()
                        console.log("ll")
                        const result=await authuser.register(user)
                        res.status(200).json(result)
                    }catch(e:any){

                  
                        res.status(500).json({message:"error interno"})
                    }
            })
            
export default authuser
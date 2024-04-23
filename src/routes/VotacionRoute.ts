import bodyParser from "body-parser"
import express,{Request,Response} from "express"
import VotacionController from "../controllers/VotacionController"
import IVotacion from "../domain/interfaces/IVotacion"
import { verifyToken } from "../middlewares/http/admin"
import { verifyTokenclient } from "../middlewares/http"

let jsonparser=bodyParser.json()
let votacionrouter=express.Router()
//longpolling
export let responseClients:Response[]=[]
export const responder=async()=>{
    const votacionController=new VotacionController()
    const result=await votacionController.getAll()
    for(let res of responseClients){
        res.status(200).json(result)
    }

    responseClients=[]

}

votacionrouter.route("/")
               .get(jsonparser,verifyToken,async(req:Request,res:Response)=>{
                     try{
                        const id=parseInt(req.query.id as string)
                        if(id){
                            const votacionController=new VotacionController()
                            const result=await votacionController.get(id)
                            return res.status(200).json(result)

                        }
                          const votacionController=new VotacionController()
                          const result=await votacionController.getAll()
                          return res.status(200).json(result)
                     }catch(e:any){
                          res.status(500).json({message:"error interno"})
                     }
               }).post(jsonparser,verifyToken,async(req:Request,res:Response)=>{
                  try{
                        const {nombre,descripcion,fechaInicio,fechaFin,isDeleted}=req.body
                        const votacion:IVotacion={
                            nombre:nombre,
                            descripcion:descripcion,
                            fechadeInicio:fechaInicio,
                            fechaFin:fechaFin,
                            isDeleted:isDeleted
                        }
                        const votacionController=new VotacionController()
                        const result=await votacionController.create(votacion)
                        await responder()
                        res.status(200).json(result)

                  }catch(e:any){
                      console.log(e.message)
                      res.status(500).json({message:"error interno"})
                  }
               })
               .patch(jsonparser,verifyToken,async(req:Request,res:Response)=>{
                     try{
                            const {id,nombre,descripcion,fechaInicio,fechaFin,isDeleted}=req.body
                            const votacion:IVotacion={
                             id:id,
                             nombre:nombre,
                             descripcion:descripcion,
                             fechadeInicio:fechaInicio,
                             fechaFin:fechaFin,
                             isDeleted:isDeleted
                            }
                            const votacionController=new VotacionController()
                            const result=await votacionController.update(votacion)
                            await responder()
                            res.status(200).json(result)
                     }catch(e:any){
                          res.status(500).json({message:"error interno"})
                     }
               })
votacionrouter.route("/new")
              .get(jsonparser,verifyToken,async(req:Request,res:Response)=>{
                responseClients.push(res)
                req.on("close",()=>{
                    const index = responseClients.length-1; 
                    responseClients = responseClients.slice(index, 1);
                })
              })
votacionrouter.route("/client")
               .get(jsonparser,verifyTokenclient,async(req:Request,res:Response)=>{
                try{
                    const id=parseInt(req.query.id as string)
                    if(id){
                        const votacionController=new VotacionController()
                        const result=await votacionController.get(id)
                        return res.status(200).json(result)

                    }
                      const votacionController=new VotacionController()
                      const result=await votacionController.getAll()
                      return res.status(200).json(result)
                 }catch(e:any){
                      res.status(500).json({message:"error interno"})
                 }
               })
votacionrouter.route("/client/new")
                .get(jsonparser,verifyTokenclient,async(req:Request,res:Response)=>{
                    responseClients.push(res)
                    req.on("close",()=>{
                        const index = responseClients.length-1; 
                        responseClients = responseClients.slice(index, 1);
                    })
                })               


               


export default votacionrouter

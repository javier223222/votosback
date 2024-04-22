import IImgCandidato from "../interfaces/IImgCandidato";
import IImgCandidatoOrm from "../interfaces/IImgCandidatoOrm";
import { db } from "../repositories/mysql.repo";

export default class  ImgCandidatoOrm implements IImgCandidatoOrm{
    public async create(imgCandidato: IImgCandidato): Promise<IImgCandidato> {
        try{
        
            const result = await db.imgCandidate.create({
                data:{
                    idcandidato:imgCandidato.idcandidato,
                    url:imgCandidato.url
                },
                select:{
                    
                    
                    idcandidato:true,
                    idimgCandidate:true,
                    url:true
                }
            })
            return {
               id:result.idimgCandidate,
                idcandidato:result.idcandidato,
                url:result.url
            }
        }catch(e:any){
            throw new Error(e.message)
        }


    }
   public async update(imgCandidato: IImgCandidato): Promise<IImgCandidato> {
        try{
         const result =await db.imgCandidate.update({
                where:{
                    idimgCandidate:imgCandidato.id
                },
                data:{
                    url:imgCandidato.url
                },
                select:{
                    idcandidato:true,
                    idimgCandidate:true,
                    url:true
                }
         })
            return {
                id:result.idimgCandidate,
                idcandidato:result.idcandidato,
                url:result.url
            }
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async delete(id: number): Promise<boolean> {
        try{
          
            const result = await db.imgCandidate.delete({
                where:{
                    idimgCandidate:id
                }
            })
            return true
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async get(id: number): Promise<IImgCandidato> {
        try{
            const result = await db.imgCandidate.findUnique({
                where:{
                    idimgCandidate:id
                },
                select:{
                    idcandidato:true,
                    idimgCandidate:true,
                    url:true
                }
            })
            return {
                id:result?.idimgCandidate,
                idcandidato:result?.idcandidato?result.idcandidato:0,
                url:result?.url?result.url:""
            }
            
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async getAll(idcandidato: number): Promise<IImgCandidato[]> {
        try{
            const result = await db.imgCandidate.findMany({
                where:{
                    idcandidato:idcandidato
                },
                select:{
                    idcandidato:true,
                    idimgCandidate:true,
                    url:true
                }
            })
            return result.map((imgCandidato)=>{
                return {
                    id:imgCandidato.idimgCandidate,
                    idcandidato:imgCandidato.idcandidato,
                    url:imgCandidato.url
                }
            })
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}
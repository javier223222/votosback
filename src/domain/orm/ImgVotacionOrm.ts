import IImgVotacion from "../interfaces/IImgVotacion";
import IImgVotacionOrm from "../interfaces/IimgVotacionOrm";
import { db } from "../repositories/mysql.repo";

export default class ImgVotacionOrm implements IImgVotacionOrm{
  public async create(imgVotacion: IImgVotacion): Promise<IImgVotacion> {
      try{
        
            const result = await db.imgVotacion.create({
                data:{
                    idvotacion:imgVotacion.idVotacion,
                    url:imgVotacion.url
                },
                select:{
                    idvotacion:true,
                    idimgVotacion:true,
                    url:true
                }
            })
            return {
                id:result.idimgVotacion,
                idVotacion:result.idvotacion,
                url:result.url
            }
      }catch(e:any){
          throw new Error(e.message)
      }
  }
  public async update(imgVotacion: IImgVotacion): Promise<IImgVotacion> {
      try{
        const result =await db.imgVotacion.update({
              where:{
                  idimgVotacion:imgVotacion.id
              },
              data:{
                  url:imgVotacion.url
              },
              select:{
                  idvotacion:true,
                  idimgVotacion:true,
                  url:true
              }
        })
          return {
              id:result.idimgVotacion,
              idVotacion:result.idvotacion,
              url:result.url
          }
      }catch(e:any){
          throw new Error(e.message)
      }
  }
  public async delete(id: number): Promise<boolean> {
      try{
          
             const result = await db.imgVotacion.delete({
                where:{
                 idimgVotacion:id
                }
             })
             return true

      }catch(e:any){
          throw new Error(e.message)
      }
  }
  public async get(id: number): Promise<IImgVotacion> {
      try{
         const result=await db.imgVotacion.findUnique({
            where:{
                idimgVotacion:id
            
            },
            select:{
                idvotacion:true,
                idimgVotacion:true,
                url:true
            }

         })
            return {
                id:result?.idimgVotacion,
                idVotacion:result?.idvotacion?result.idvotacion:0,
                url:result?.url?result.url:""}
      }catch(e:any){
            throw new Error(e.message)
      }
  }
  public async getAll(idvotacion: number): Promise<IImgVotacion[]> {
      try{
        const result=await db.imgVotacion.findMany({
            where:{
                idvotacion:idvotacion
            },
            select:{
                idvotacion:true,
                idimgVotacion:true,
                url:true
            }
        })
        return result.map((img)=>{
            return {
                id:img.idimgVotacion,
                idVotacion:img.idvotacion,
                url:img.url
            }
        })
      }catch(e:any){
            throw new Error(e.message)
      }
  }
}


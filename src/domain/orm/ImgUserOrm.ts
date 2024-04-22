import IImgUserOrm from "../interfaces/IImgUserOrm";
import ImgUser from "../interfaces/ImgUser";
import { db } from "../repositories/mysql.repo";
export default class ImgUserOrm implements IImgUserOrm{
    public async create(imgUser: ImgUser): Promise<ImgUser> {
        try{
            
            const result =await db.imgUsuario.create({
                data:{
                  idusuario: imgUser.idUser,
                  url: imgUser.url
                },
                select:{
                    idusuario:true,
                    url:true
                }
            })

            return {
                idUser: result.idusuario,
                url: result.url
            }
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async update(imgUser: ImgUser): Promise<ImgUser> {
        try{
            const result = await db.imgUsuario.update({
                where:{
                   idimgUsuario: imgUser.id
                },
                data:{
                    url: imgUser.url
                },
                select:{
                    idusuario:true,
                    url:true
                }
            })
            return {
                idUser: result.idusuario,
                url: result.url
            }


        }catch(e:any){
            throw new Error(e.message)
        }
    }
   public async delete(id: number): Promise<boolean> {
        try{
          const result = await db.imgUsuario.delete({
            where:{
                idimgUsuario:id
            }
          })
            return true
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async get(id: number): Promise<ImgUser> {
        try{
            const result = await db.imgUsuario.findUnique({
                where:{
                    idimgUsuario:id
                },
                select:{
                    idusuario:true,
                    url:true
                }
            })
            return {
                idUser: result?.idusuario?result.idusuario:0,
                url: result?.url?result.url:""
            }
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async getAll(iduser:number): Promise<ImgUser[]> {
        try{
         const result = await db.imgUsuario.findMany({
         where:{
            idusuario:iduser
         }
         })
            return result.map((img)=>{
                return {
                    id: img.idimgUsuario,
                    idUser: img.idusuario,
                    url: img.url
                }
            })
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}
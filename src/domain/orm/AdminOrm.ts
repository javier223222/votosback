import Admin from "../interfaces/IAdmin";
import IAdminOrm from "../interfaces/IAdminOrm";
import IAdminUpdate from "../interfaces/IAdminUpdate";
import { db } from "../repositories/mysql.repo";

export default class AdminOrm implements IAdminOrm{
    public async create(admin: Admin): Promise<Admin> {
        try{
            const result =await db.admin.create({
                data:{
                   username: admin.username,
                   nombre: admin.nombre,
                   apellido: admin.apellido,
                   password: admin.password? admin.password : "",
                   email: admin.email,
                  idrole: admin.idRol
                },
                select:{
                    username:true,
                    email:true,
                    nombre:true,
                    apellido:true,
                    idrole:true
                }
            })

            return {
                username: result.username,
                email: result.email,
                nombre: result.nombre,
                apellido: result.apellido,
                idRol: result.idrole
            }

        }catch(e:any){
        throw new Error(e.message)
        }

    }
    public async update(admin: IAdminUpdate): Promise<Admin> {
        try{
           if(admin.username){
            const result = await db.admin.update({
                where:{
                    id: admin.id
                },
                data:{
                    username: admin.username
                },
                select:{
                    username:true,
                    email:true,
                    nombre:true,
                    apellido:true,
                    idrole:true
                }
            })
            return {
                username: result.username,
                email: result.email,
                nombre: result.nombre,
                apellido: result.apellido,
                idRol: result.idrole
            }
          }else if(admin.name){
            const result = await db.admin.update({
                where:{
                    id: admin.id
                },
                data:{
                    nombre: admin.name
                },
                select:{
                    username:true,
                    email:true,
                    nombre:true,
                    apellido:true,
                    idrole:true
                }
            })
            return {
                username: result.username,
                email: result.email,
                nombre: result.nombre,
                apellido: result.apellido,
                idRol: result.idrole
            }
          }else if(admin.apellido){
                const result = await db.admin.update({
                    where:{
                        id: admin.id
                    },
                    data:{
                        apellido: admin.apellido
                    },
                    select:{
                        username:true,
                        email:true,
                        nombre:true,
                        apellido:true,
                        idrole:true
                    }
                })
                return {
                    username: result.username,
                    email: result.email,
                    nombre: result.nombre,
                    apellido: result.apellido,
                    idRol: result.idrole
                }
            }
            else{
                throw new Error("No se puede actualizar")
            }

          
        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async delete(id: number): Promise<boolean> {
        try{
            const result = await db.admin.delete({
                where:{
                    id:id
                }
            })
            return true

        }catch(e:any){
            throw new Error(e.message)
        }
        
    }
    public async get(id: number): Promise<Admin> {
        try{
            const result = await db.admin.findUnique({
                where:{
                    id:id
                },
                select:{
                    username:true,
                    email:true,
                    nombre:true,
                    apellido:true,
                    idrole:true
                }
            })
            return {
                username: result?.username? result.username : "",
                email: result?.email? result.email : "",
                nombre: result?.nombre? result.nombre : "",
                apellido: result?.apellido ? result.apellido : "",
                idRol: result?.idrole ? result.idrole : 0
            }

        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async getAll(): Promise<Admin[]> {
        try{

            const result = await db.admin.findMany({
                select:{
                    username:true,
                    email:true,
                    nombre:true,
                    apellido:true,
                    idrole:true
                }
            })
            return result.map((admin)=>{
                return {
                    username: admin.username,
                    email: admin.email,
                    nombre: admin.nombre,
                    apellido: admin.apellido,
                    idRol: admin.idrole
                }
            })
          
        }catch(e:any){
            throw new Error(e.message)
        }
    }
   public async  getByEmail(email: string): Promise<Admin> {
        try{
            const result = await db.admin.findUnique({
                where:{
                    email:email
                },
                select:{
                    username:true,
                    email:true,
                    nombre:true,
                    apellido:true,
                    idrole:true,
                    password:true
                }
            })
            return {
                username: result?.username? result.username : "",
                email: result?.email? result.email : "",
                nombre: result?.nombre? result.nombre : "",
                apellido: result?.apellido ? result.apellido : "",
                idRol: result?.idrole ? result.idrole : 0,
                password: result?.password? result.password : ""
            }

        }catch(e:any){
            throw new Error(e.message)
        }
    }

}
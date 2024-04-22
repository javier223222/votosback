import IUser from "../interfaces/IUser";
import IUserOrm from "../interfaces/IUserOrm";
import { db } from "../repositories/mysql.repo";

export default class UserOrm implements IUserOrm {
  public async  create(user: IUser): Promise<IUser> {
       try{
              const result = await db.usuario.create({
                data:{
                     nombre: user.name,
                     apellido: user.apellidos,
                     email: user.email,
                     password: user.password
                },
                select:{
                     nombre:true,
                     apellido:true,
                     email:true
                }
              })
              return {
                name: result.nombre,
                apellidos: result.apellido,
                email: result.email,
                password:""
              }
        
       }catch(e:any){
              throw new Error(e.message)
       }
   }
   public async update(user: IUser): Promise<IUser> {
       try{
                const result = await db.usuario.update({
                    where:{
                         idusuario: user.id
                    },
                    data:{
                         nombre: user.name,
                         apellido: user.apellidos,
                         email: user.email,
                         password: user.password
                    },
                    select:{
                         nombre:true,
                         apellido:true,
                         email:true
                    }
                })
                return {
                    name: result.nombre,
                    apellidos: result.apellido,
                    email: result.email,
                    password:""
                }

       }catch(e:any){
              throw new Error(e.message)
       }
   }
   public async delete(id: number): Promise<boolean> {
       try{
                await db.usuario.delete({
                    where:{
                        idusuario:id
                    }
                })
                return true

       }catch(e:any){
              throw new Error(e.message)
       }
   }
   public async get(id: number): Promise<IUser> {
       try{
        

                const result = await db.usuario.findUnique({
                    where:{
                        idusuario:id
                    }
                })
                return {
                    name: result?.nombre?result.nombre:"",
                    apellidos: result?.apellido?result.apellido:"",
                    email: result?.email?result.email:"",
                    password:""
                }

       }catch(e:any){
              throw new Error(e.message)
       }
   }
   public async getAll(): Promise<IUser[]> {
       try{
                const result = await db.usuario.findMany({
                    select:{
                        nombre:true,
                        apellido:true,
                        email:true
                    }
                })
                return result.map((user:any)=>{
                    return {
                        name: user.nombre,
                        apellidos: user.apellido,
                        email: user.email,
                        password:""
                    }
                })
       }catch(e:any){
                throw new Error(e.message)
       }
   }
   public async getByEmail(email: string): Promise<IUser> {
       try{

                const result = await db.usuario.findUnique({
                    where:{
                        email:email
                    }
                })
                return {
                    id: result?.idusuario?result.idusuario:0,
                    name: result?.nombre?result.nombre:"",
                    apellidos: result?.apellido?result.apellido:"",
                    email: result?.email?result.email:"",
                    password:result?.password?result.password:""
                }

       }catch(e:any){
                throw new Error(e.message)
       }
   }
}
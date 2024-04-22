import IAdminRole from "../interfaces/IAdminRole";
import { db } from "../repositories/mysql.repo";

export default class AdminRoleOrm implements IAdminRole{
    public async create(role: string): Promise<number> {
        try{
          const result=await db.role.create({
            data:{
                name:role
            },
            select:{
                idrole:true
            }
          })
          return result.idrole
        }catch(e:any){
            throw new Error(e.message)
        }
    }
   public async update(id: number, role: string): Promise<boolean> {
        try{
            const result=await db.role.update({
                where:{
                    idrole:id
                },
                data:{
                    name:role
                }
            })
            return true

        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async delete(id: number): Promise<boolean> {
        try{
            const result = await db.role.delete({
                where:{
                    idrole:id
                }
            })

            return true
        }catch(e:any){
            throw new Error(e.message)
        }

    }
    public async get(id: number): Promise<any> {
        try{
            const result = await db.role.findUnique({
                where:{
                    idrole:id
                }
            })

            return result

        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async getAll(): Promise<any[]> {
        try{
          
            const result = await db.role.findMany()
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async getbyName(role: string): Promise<any> {
        try{
            const result = await db.role.findUnique({
                where:{
                    name:role
                }
            })
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}
import ICandidato from "../interfaces/ICandidato";
import ICandidatoOrm from "../interfaces/ICandidatoOrm";
import { db } from "../repositories/mysql.repo";

export default class CandidatoOrm implements ICandidatoOrm{
    public async create(candidato: ICandidato): Promise<ICandidato> {
        try{
         const result=await db.candidato.create({
            data:{
                nombre:candidato.name,
                apellido:candidato.apellido
            },
            select:{
                idcandidato:true,
                nombre:true,
                apellido:true
            }
         })  
            return {
                id:result.idcandidato,
                name:result.nombre,
                apellido:result.apellido
            } 
        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async update(candidato: ICandidato): Promise<ICandidato> {
        try{
            const result=await db.candidato.update({
                where:{
                    idcandidato:candidato.id
                },
                data:{
                    nombre:candidato.name,
                    apellido:candidato.apellido

                },
                select:{
                    idcandidato:true,
                    nombre:true,
                    apellido:true
                }
            })

            return {
                id:result.idcandidato,
                name:result.nombre,
                apellido:result.apellido
            }

        }catch(e:any){
           throw new Error(e.message)
        }
    }
    public async get(id: number): Promise<ICandidato> {
        try{

            const result=await db.candidato.findUnique({
                where:{
                    idcandidato:id
                },
                select:{
                    idcandidato:true,
                    nombre:true,
                    apellido:true
                }
            })

            return {
                id:result?.idcandidato,
                name:result?.nombre?result.nombre:"No encontrado",
                apellido:result?.apellido?result.apellido:"No encontrado"
            }

        }catch (e:any){
            throw new Error(e.message)
        }
    }
    public async getAll(): Promise<ICandidato[]> {
        try{
            const result=await db.candidato.findMany({
                select:{
                    idcandidato:true,
                    nombre:true,
                    apellido:true
                }
            })

            return result.map((candidato)=>{
                return {
                    id:candidato.idcandidato,
                    name:candidato.nombre,
                    apellido:candidato.apellido
                }
            })

        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async delete(id: number): Promise<boolean> {
        try{
            await db.candidato.delete({
                where:{
                    idcandidato:id
                }
            })
            return true
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}
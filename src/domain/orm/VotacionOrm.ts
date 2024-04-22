import IVotacion from "../interfaces/IVotacion";
import IVotacionOrm from "../interfaces/IVotacionOrm";
import { db } from "../repositories/mysql.repo";

export default class VotacionOrm implements IVotacionOrm{
    public async create(votacion: IVotacion): Promise<IVotacion> {
        try{
            //             

            
            const result =await db.votacion.create({
                data:{
                 nombre:votacion.nombre,
                 descripcion:votacion.descripcion,
                 fechaInicio:new Date(votacion.fechadeInicio),
                 fechaFin:new Date(votacion.fechaFin)
                },
                select:{
                    idvotacion:true,
                    nombre:true,
                    descripcion:true,
                    fechaInicio:true,
                    fechaFin:true,
                    isDeleted:true
                }
            })

            return {
                id:result.idvotacion,
                nombre:result.nombre,
                descripcion:result.descripcion,
                fechadeInicio:result.fechaInicio,
                fechaFin:result.fechaFin,
                isDeleted:result.isDeleted
            }
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async update(votacion: IVotacion): Promise<IVotacion> {
        try{
            const result = await db.votacion.update({
                where:{
                   idvotacion: votacion.id
                },
                data:{
                    nombre:votacion.nombre,
                    descripcion:votacion.descripcion,
                    fechaInicio:votacion.fechadeInicio,
                    fechaFin:votacion.fechaFin
                },
                select:{
                    idvotacion:true,
                    nombre:true,
                    descripcion:true,
                    fechaInicio:true,
                    fechaFin:true,
                    isDeleted:true
                }
            })
            return {
                id:result.idvotacion,
                nombre:result.nombre,
                descripcion:result.descripcion,
                fechadeInicio:result.fechaInicio,
                fechaFin:result.fechaFin,
                isDeleted:result.isDeleted
            }
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async delete(id: number): Promise<boolean> {
        try{
            const result = await db.votacion.delete({
                where:{
                    idvotacion:id
                }
            })
                return true

        }catch(e:any){
            throw new Error(e.message)
        }
        
    }
    public async get(id: number): Promise<any> {
        try{
            const result=await db.votacion.findUnique({
                where:{
                    idvotacion:id,
                    isDeleted:false
                },
                select:{
                    idvotacion:true,
                    nombre:true,
                    descripcion:true,
                    fechaInicio:true,
                    fechaFin:true,
                    isDeleted:true,
                    
                    imgVotacion:{
                        select:{
                            idimgVotacion:true,
                            url:true
                        }
                    },
                    
                    candidatoOfVotation:{
                        select:{
                            idcandidatoOfVotation:true,
                            candidato:{
                                select:{
                                    idcandidato:true,
                                    nombre:true,
                                    apellido:true,
                                    imgCandidate:{
                                        select:{
                                            idimgCandidate:true,
                                            url:true
                                        }
                                    }
                                }
                            }
                        }
                    },


                }
            })
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async getAll(): Promise<any[]> {
        try{
         const result = await db.votacion.findMany({
            where:{
                isDeleted:false
            },
            select:{
                idvotacion:true,
                nombre:true,
                descripcion:true,
                fechaInicio:true,
                fechaFin:true,
                isDeleted:true,
                imgVotacion:{
                    select:{
                        idimgVotacion:true,
                        url:true
                    }
                },
                candidatoOfVotation:{
                    select:{
                        idcandidatoOfVotation:true,
                        candidato:{
                            select:{
                                idcandidato:true,
                                nombre:true,
                                apellido:true,
                                imgCandidate:{
                                    select:{
                                        idimgCandidate:true,
                                        url:true
                                    }
                                }
                            }
                        }
                    }
                }
            }
         })
            return result
         







        }catch(e:any){
            throw new Error(e.message)
        }
        
    }
}
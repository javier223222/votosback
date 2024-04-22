import ICandidatoOfVotation from "../interfaces/ICandidatoOfVotation";
import ICandidatoOfVotationOrm from "../interfaces/ICandidatoOfVotationOrm";
import { db } from "../repositories/mysql.repo";

export default class candidatoOfVotation implements ICandidatoOfVotationOrm {
    public async create(candidatoOfVotation: ICandidatoOfVotation): Promise<ICandidatoOfVotation> {
        try{
            const result=await db.candidatoOfVotation.create({
                data:{
                    idcandidato:candidatoOfVotation.idCandidato,
                    idvotacion:candidatoOfVotation.idVotacion
                },
                select:{
                    idcandidato:true,
                    idvotacion:true
                }
            })

            return {
                idCandidato:result.idcandidato,
                idVotacion:result.idvotacion
            };

        }catch(error:any){
            throw new Error(error.message);
        }
    }
    public async update(candidatoOfVotation: ICandidatoOfVotation): Promise<ICandidatoOfVotation> {
       try{
              const result=await db.candidatoOfVotation.update({
                where:{
                     idcandidatoOfVotation:candidatoOfVotation.id
                },
                data:{
                     idcandidato:candidatoOfVotation.idCandidato,
                     idvotacion:candidatoOfVotation.idVotacion
                },
                select:{
                     idcandidato:true,
                     idvotacion:true
                }
              })
    
              return {
                idCandidato:result.idcandidato,
                idVotacion:result.idvotacion
              };
       }catch(error:any){
           throw new Error(error.message);
       }
    }
    public async delete(id: number): Promise<boolean> {
        try{
           

            await db.candidatoOfVotation.delete({
                where:{
                    idcandidatoOfVotation:id
                }
            })

            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    public async get(id: number): Promise<any> {
        try{
          const result=await db.candidatoOfVotation.findUnique({
                where:{
                    idcandidatoOfVotation:id
                }
        
          })
          return result;
        }catch(error:any){
            throw new Error(error.message);
        }
    }
    public async getAll(idVotacion: number): Promise<any> {
        try{
         const result=await db.candidatoOfVotation.findMany({
           where:{
            idvotacion:idVotacion
           } 
         })
            return result;
        }catch(e:any){
            throw new Error(e.message);
        }
    }
}
import IWinner from "../interfaces/IWinner";
import IWinnerOrm from "../interfaces/IWinnerOrm";
import { db } from "../repositories/mysql.repo";

export default class WinnerOrm implements IWinnerOrm{
    public async create(winner: IWinner): Promise<IWinner> {
        try{
            
            const result=await db.winner.create({
                data:{
                    idvotacion:winner.idVotacion,
                    idcandidato:winner.idCandidato
                },
                select:{
                    idvotacion:true,
                    idcandidato:true
                }
            })

            return {
                idVotacion:result.idvotacion,
                idCandidato:result.idcandidato
            };

        }catch(error:any){
            throw new Error(error.message);
        }
    }
    public async update(winner: IWinner): Promise<IWinner> {
        try{
          
            const result=await db.winner.update({
                where:{
                    idwinner:winner.id
                },
                data:{
                    idvotacion:winner.idVotacion,
                    idcandidato:winner.idCandidato
                },
                select:{
                    idvotacion:true,
                    idcandidato:true
                }
            })

            return {
                idVotacion:result.idvotacion,
                idCandidato:result.idcandidato
            };
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    public async delete(id: number): Promise<boolean> {
        try{
      

            await db.winner.delete({
                where:{
                    idwinner:id
                }
            })
            return true;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

   public async  get(id: number): Promise<IWinner> {
        try{
            
            const result=await db.winner.findUnique({
                where:{
                    idwinner:id
                },
                select:{
                    idvotacion:true,
                    idcandidato:true
                }
            })

            return {
                idVotacion:result?.idvotacion?result.idvotacion:0,
                idCandidato:result?.idcandidato?result.idcandidato:0
            };
        }catch(error:any){
            throw new Error(error.message);
        }
    }
   public async  getAll(idvotacion:number): Promise<IWinner[]> {
          try{

                const result=await db.winner.findMany({
                    where:{
                        idvotacion:idvotacion
                    },
                    select:{
                        idvotacion:true,
                        idcandidato:true
                    }
                })
    
                return result.map((winner)=>{
                    return {
                        idVotacion:winner.idvotacion,
                        idCandidato:winner.idcandidato
                    }
                });

          }catch(error:any){
                throw new Error(error.message);
          }
    }
}
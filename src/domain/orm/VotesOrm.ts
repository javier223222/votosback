import IVotes from "../interfaces/IVotes";
import IVotesOrm from "../interfaces/IVotesOrm";
import { db } from "../repositories/mysql.repo";

export default class VotesOrm implements IVotesOrm{
    public async create(vote: IVotes): Promise<any> {
        try{
           const result=await db.votes.create({
            data:{
             idcandidato:vote.idcandidate,
             idvotation:vote.idvotation,
             idusuario:vote.iduser
            },
            
           })
              return result;
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async update(vote: IVotes): Promise<any> {
        try{
            
            const result=await db.votes.update({
                where:{
                    idvotes:vote.id
                },
                data:{
                    idcandidato:vote.idcandidate,
                    idvotation:vote.idvotation,
                    idusuario:vote.iduser
                }
            })
            return result;
        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async get(id: number): Promise<any> {
        try{
            const result=await db.votes.findMany({
                where:{
                  idvotation:id
                },
                orderBy:{
                    idcandidato:"desc"
                }
            })
            return result;
          
        }catch(e:any){
            throw new Error(e.message)
        }
    }

    public async getAll(idVotacion: number): Promise<any> {
        try{
            
            const result=await db.votes.findMany({
                where:{
                    idvotation:idVotacion
                }
            })
            return result;
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async delete(id: number): Promise<boolean> {
        try{
            const result = await db.votes.delete({
                where:{
                    idvotes:id
                }
            })
            return true
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async find(idvotacion: number, iduser: number): Promise<any> {
        try{
           
            const result = await db.votes.findMany({
                where:{
                    idvotation:idvotacion,
                    idusuario:iduser
                }
            })
            return result;
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}
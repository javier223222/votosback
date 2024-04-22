import IVotacion from "../domain/interfaces/IVotacion";
import IVotacionOrm from "../domain/interfaces/IVotacionOrm";
import VotacionOrm from "../domain/orm/VotacionOrm";

export default class VotacionController implements IVotacionOrm{
    public async create(votacion: IVotacion): Promise<IVotacion> {
        try{
            const votacionOrm = new VotacionOrm()
            const result = await votacionOrm.create(votacion)
            return result
        }catch(e:any){
            throw new Error(e.message)
        }

    }

   public async  delete(id: number): Promise<boolean> {
        try{
            const votacionOrm = new VotacionOrm()
            const result = await votacionOrm.delete(id)
            return result

        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async update(votacion: IVotacion): Promise<IVotacion> {
      try{
            const votacionOrm = new VotacionOrm()
            const result = await votacionOrm.update(votacion)
            return result
      } catch(e:any){
          throw new Error(e.message)
      }   
    }

    public async get(id: number): Promise<IVotacion> {
        try{
            const votacionOrm = new VotacionOrm()
            const result = await votacionOrm.get(id)
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async getAll(): Promise<any[]> {
        try{
            const votacionOrm = new VotacionOrm()
            const result = await votacionOrm.getAll()
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }

}
import ICandidato from "../domain/interfaces/ICandidato"
import CandidatoOrm from "../domain/orm/CandidatoOrm"
export default class CandidatoController{
    public async create(candidato: ICandidato): Promise<ICandidato> {
        try{
            const candidatoOrm = new CandidatoOrm()
            const result = await candidatoOrm.create(candidato)
            return result
        }catch(e:any){
            throw new Error(e.message)
        }

    }

   public async  delete(id: number): Promise<boolean> {
        try{
            const candidatoOrm = new CandidatoOrm()
            const result = await candidatoOrm.delete(id)
            return result

        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async update(candidato: ICandidato): Promise<ICandidato> {
      try{
            const candidatoOrm = new CandidatoOrm()
            const result = await candidatoOrm.update(candidato)
            return result
      } catch(e:any){
          throw new Error(e.message)
      }   
    }

    public async get(id: number): Promise<ICandidato> {
        try{
            const candidatoOrm = new CandidatoOrm()
            const result = await candidatoOrm.get(id)
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async getAll(): Promise<any[]> {
        try{
            const candidatoOrm = new CandidatoOrm()
            const result = await candidatoOrm.getAll()
            return result
        }catch(e:any){
            throw new Error(e.message)
        }
    }
}
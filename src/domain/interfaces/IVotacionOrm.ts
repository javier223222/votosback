import IVotacion from "./IVotacion"

export default interface IVotacionOrm{
    create(votacion:IVotacion):Promise<IVotacion>
    update(votacion:IVotacion):Promise<IVotacion>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<any>
    getAll():Promise<any[]>
    
}
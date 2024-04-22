
import IWinner from "./IWinner"
export default interface IWinnerOrm{
    
    create(winner:IWinner):Promise<IWinner>
    update(winner:IWinner):Promise<IWinner>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<IWinner>
    getAll(idvotacion:number):Promise<IWinner[]>
}
import ICandidato from "./ICandidato";

export default interface ICandidatoOrm{
    create(candidato:ICandidato):Promise<ICandidato>
    update(candidato:ICandidato):Promise<ICandidato>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<ICandidato>
    getAll():Promise<ICandidato[]>
}
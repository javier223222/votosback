import IImgCandidato from "./IImgCandidato"

export default interface IImgCandidatoOrm {
    create(imgCandidato:IImgCandidato):Promise<IImgCandidato>
    update(imgCandidato:IImgCandidato):Promise<IImgCandidato>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<IImgCandidato>
    getAll(idcandidato:number):Promise<IImgCandidato[]>
}
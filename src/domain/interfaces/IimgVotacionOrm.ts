import IImgVotacion from "./IImgVotacion";
export default interface IImgVotacionOrm {
   create(imgVotacion: IImgVotacion): Promise<IImgVotacion>
    update(imgVotacion: IImgVotacion): Promise<IImgVotacion>
    delete(id: number): Promise<boolean>
    get(id: number): Promise<IImgVotacion>
    getAll(idvotacion: number): Promise<IImgVotacion[]>
    
}
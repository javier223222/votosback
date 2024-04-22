import IVotes from "./IVotes";

export default interface IVotesOrm{
    create(vote: IVotes): Promise<any>;
    delete(id: number): Promise<boolean>;
    update(vote: IVotes): Promise<any>;
    get(id: number): Promise<any>;
    getAll(idVotacion:number): Promise<any>;
    find(idvotacion:number,iduser:number):Promise<any>

}
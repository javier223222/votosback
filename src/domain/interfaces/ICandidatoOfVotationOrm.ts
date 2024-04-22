import ICandidatoOfVotation from "./ICandidatoOfVotation";
export default interface ICandidatoOfVotationOrm{
    create(candidatoOfVotation: ICandidatoOfVotation): Promise<ICandidatoOfVotation>;
    delete(id: number): Promise<boolean>;
    update(candidatoOfVotation: ICandidatoOfVotation): Promise<ICandidatoOfVotation>;
    get(id: number): Promise<any>;
    getAll(idVotacion:number): Promise<any>;
}
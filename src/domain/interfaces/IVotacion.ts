export default interface IVotacion{
    id?:number;
    nombre:string;
    descripcion:string;
    fechadeInicio:Date;
    fechaFin:Date;
    isDeleted:boolean;
}
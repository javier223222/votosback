export default interface IAdminRole{
    create(role:string):Promise<number>
    delete(id:number):Promise<boolean>
    update(id:number,role:string):Promise<boolean>
    get(id:number):Promise<any>
    getAll():Promise<any[]>
    getbyName(role:string):Promise<any>

}
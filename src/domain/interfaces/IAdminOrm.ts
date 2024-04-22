import Admin from "./IAdmin";
import IAdminUpdate from "./IAdminUpdate";

export default interface IAdminOrm {
    create(admin:Admin):Promise<Admin>
    update(admin:IAdminUpdate):Promise<Admin>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<Admin>
    getByEmail(email:string):Promise<Admin>
    getAll():Promise<Admin[]>
    
}
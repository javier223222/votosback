import IUser from "./IUser"

export default interface IUserOrm{
    create(user:IUser):Promise<IUser>
    update(user:IUser):Promise<IUser>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<IUser>
    getByEmail(email:string):Promise<IUser>
    getAll():Promise<IUser[]>
}
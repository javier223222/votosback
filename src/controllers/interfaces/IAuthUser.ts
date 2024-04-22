import IUser from "../../domain/interfaces/IUser";
export default interface IAuthUser{
    register(user:IUser):Promise<IUser>
    login(email:string,password:string):Promise<string>

}
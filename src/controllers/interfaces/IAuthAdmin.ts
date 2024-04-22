import Admin from "../../domain/interfaces/IAdmin";

export default interface IAuthAdmin{
    register(admin:Admin,namerole:string):Promise<Admin>
    login(email:string,password:string):Promise<string>
}
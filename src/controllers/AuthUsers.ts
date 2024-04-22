import IUser from "../domain/interfaces/IUser";
import UserOrm from "../domain/orm/UserOrm";
import { getToken } from "../utils/jwt/user";
import IAuthUser from "./interfaces/IAuthUser";
import bcrypt from "bcrypt"
export default class AuthUser implements IAuthUser{
    public async register(user: IUser): Promise<IUser> {
        try{
            const userorm=new UserOrm()
            user.password=bcrypt.hashSync(user.password,10)
            const nuevuser=await userorm.create(user)
            return nuevuser

        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async login(email: string, password: string): Promise<string> {
        try{





            const userorm=new UserOrm()
            const user=await userorm.getByEmail(email)
            if(!user){
                throw new Error("Usuario no encontrado")
            }
            if(bcrypt.compareSync(password,user.password)){
                
              const token=await getToken(user)
              return token
            }
            throw new Error("Contraseña incorrecta")
            

        }catch(e:any){
            throw new Error(e.message)
        }
        
    }


}
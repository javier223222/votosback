import Admin from "../domain/interfaces/IAdmin";
import AdminOrm from "../domain/orm/AdminOrm";
import AdminRoleOrm from "../domain/orm/AdminRoleOrm";
import { getToekndata, getToken } from "../utils/jwt/admin";
import IAuthAdmin from "./interfaces/IAuthAdmin";
import bcrypt from "bcrypt"
export default class AuthAdmin implements IAuthAdmin{
    public async register(admin: Admin,namerole:string): Promise<Admin> {
        try{
            const adminOrm = new AdminOrm()
            const adminrol=new AdminRoleOrm()
            const rol=await adminrol.getbyName(namerole)
            admin.password=bcrypt.hashSync(admin?.password?admin.password:"",10)
            admin.idRol=rol.idrole
            const result = await adminOrm.create(admin)
            return result
            

            
            

        }catch(e:any){
            throw new Error(e.message)
        }
    }
    public async login(email: string, password: string): Promise<string> {
        try{
            const adminOrm = new AdminOrm()
            const result = await adminOrm.getByEmail(email)
            if(bcrypt.compareSync(password,result.password?result.password:"")){
                const token=await getToken(result)
                return token
            }
            throw new Error("Invalid password")
        }catch(e:any){
            throw new Error(e.message)
        }
    }

}
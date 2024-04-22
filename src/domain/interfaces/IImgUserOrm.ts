import ImgUser from "./ImgUser"
export default interface IImgUserOrm {
    create(imgUser:ImgUser):Promise<ImgUser>
    update(imgUser:ImgUser):Promise<ImgUser>
    delete(id:number):Promise<boolean>
    get(id:number):Promise<ImgUser>
    getAll(iduser:number):Promise<ImgUser[]>
}
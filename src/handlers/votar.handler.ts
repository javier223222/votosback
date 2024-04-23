import VotacionOrm from "../domain/orm/VotacionOrm"
import VotesOrm from "../domain/orm/VotesOrm"
import { getToekndata } from "../utils/jwt/user"

export default (io:any,socket:any)=>{
    const votar=async(idvotacion:string,idcandidato:string,token:string)=>{
        socket.join(idvotacion)
       console.log("votar",idvotacion,idcandidato,token)
       const descrip=await getToekndata(token)
       const {id}=descrip
       const votesorm=new VotesOrm() 
       const votacionorm=new VotacionOrm()
       const result=await votesorm.find(parseInt(idvotacion),id)
       if(result.length>0){
        io.of("/user/votaciones").to(idvotacion).emit("error:votar",{
            success:false,
            message:"Ya votaste en esta votacion"
        })

       }else{
        const createvote=await votesorm.create({
            idvotation:parseInt(idvotacion),
            idcandidate:parseInt(idcandidato),
            iduser:id,
            isDeleted:false
         }) 
         const votacion=await votacionorm.get(parseInt(idvotacion))
         console.log(votacion)
         const candidatos=votacion.candidatoOfVotation
         for (let i = 0; i < candidatos.length; i++) {
            const candidato = candidatos[i];
            let totalvotos=await votesorm.get(parseInt(idvotacion),candidato.candidato.idcandidato)
            candidato.votos=totalvotos
            
        }
        io.of("/votaciones").to(idvotacion).emit("candidato:get",candidatos)
        io.of("/user/votaciones").to(idvotacion).emit("candidato:get",candidatos)

       }
         

         
    }


    socket.on("votar:create",votar)
    
    

}
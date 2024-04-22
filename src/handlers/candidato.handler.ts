import ICandidato from "../domain/interfaces/ICandidato"
import candidatoOfVotation from "../domain/orm/CandidatoOfVotationOrm"
import CandidatoOrm from "../domain/orm/CandidatoOrm"
import VotacionOrm from "../domain/orm/VotacionOrm"
import VotesOrm from "../domain/orm/VotesOrm"

export default (io:any,socket:any)=>{
    const addcandidato=async(candidato:ICandidato,id:string)=>{
        const candidatoOrm = new CandidatoOrm()
        const result = await candidatoOrm.create(candidato)
        const candidatoOfVotationorm=new candidatoOfVotation()

        const candidatoVotacion=await candidatoOfVotationorm.create({
           idVotacion:parseInt(id as string),
          idCandidato:result?.id?result.id:0
        })
        const votacionorm=new VotacionOrm()
        const votacion=await votacionorm.get(parseInt(id))
        io.of("/votaciones").to(id).emit("candidato:get",votacion)
        io.of("/user/votaciones").to(id).emit("candidato:get",votacion)

    }
    socket.on("candidato:create",addcandidato)
    socket.on("joinRoom",async(idRoom:any) => {
        console.log("joinRoom",idRoom)
        const votosofcandiorm=new VotesOrm()
        const votos=await votosofcandiorm.get(parseInt(idRoom))
        console.log(votos)
        socket.join(idRoom)
        
     })
}
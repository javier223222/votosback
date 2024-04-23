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
        const votosofcandiorm=new VotesOrm()
        const votacion=await votacionorm.get(parseInt(id))
        const candidatos=votacion.candidatoOfVotation
        for (let i = 0; i < candidatos.length; i++) {
            const candidato = candidatos[i];
            let totalvotos=await votosofcandiorm.get(parseInt(id),candidato.candidato.idcandidato)
            candidato.votos=totalvotos
            
        }
        io.of("/votaciones").to(id).emit("candidato:get",candidatos)
        io.of("/user/votaciones").to(id).emit("candidato:get",candidatos)

    }

    const joinnewroom=async(data:any)=>{
        console.log("joinRoom",data.idvotes)
        const votosofcandiorm=new VotesOrm()
        const votacionorm=new VotacionOrm()
        
        const votacion=await votacionorm.get(parseInt(data.idvotes))
     
        const candidatos=votacion.candidatoOfVotation
        for (let i = 0; i < candidatos.length; i++) {
            const candidato = candidatos[i];
            let totalvotos=await votosofcandiorm.get(parseInt(data.idvotes),candidato.candidato.idcandidato)
            candidato.votos=totalvotos
            
        }
      
        socket.join(data.idvotes)
        io.of("/votaciones").to(data.idvotes).emit("candidato:get",candidatos)
        io.of("/user/votaciones").to(data.idvotes).emit("candidato:get",candidatos)
        
        
    }
    socket.on("candidato:create",addcandidato)
    socket.on("joinRoom",joinnewroom)
}
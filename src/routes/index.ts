import express,{Express} from "express"
import authrouter from "./AuthAdminRoute"
import authuser from "./AuthUserRoute"

import votacionrouter from "./VotacionRoute"
import { verifyToken } from "../middlewares/http/admin"
import { verifytokenadminandclient } from "../middlewares/http"

let root:Express=express()
root.use("/admin/auth",authrouter)
root.use("/user/auth",authuser)
root.use("/votacion",verifyToken,votacionrouter)


export default root
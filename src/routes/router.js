import express from "express"
import { createUser, deleteUser, getUser, getUsers, login, updateUser } from "../services/usuario.service"
import { autenticacao, isAnalista } from "../middleware/autenticacao"

const router = express.Router()

//ROTAS DE USUARIOS
router.get("/usuarios",isAnalista, getUsers)
router.get("/usuario/:id", getUser)
router.post("/usuario", createUser)
router.put("/usuario/:id", updateUser)
router.delete("/usuario/:id", deleteUser)
router.post("/login", login)


export default router;
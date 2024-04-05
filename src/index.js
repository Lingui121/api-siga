import express from "express"
import dotenv from "dotenv"
import router from "./routes/router"
import cors from "cors"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

const porta = process.env.PORT || 8002

app.listen(porta, () => {
    console.log("Servidor no ar na porta " + porta)
})


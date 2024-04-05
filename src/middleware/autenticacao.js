import jwt from "jsonwebtoken"


export function autenticacao(req, res, next){

    const { 
            access_token
          } = req.headers
    try{
        const chave = process.env.CHAVESECRETA
        const verificacao = jwt.verify(access_token, chave, (erro, result) => {
        if(erro){
            return res.json({   erro,  Mensagem: "Token Espirado" })                   
        }
        const { idUsuario, tipoUsuario } = result
        req.user = {idUsuario, tipoUsuario}
        return res.json({verificacao})
    })
    next()
    }catch(erro){
        return res.json(erro)
    }
}

export function isAnalista(req, res, next){

    const { access_token } = req.headers
    const verificacao = jwt.verify(access_token, process.env.CHAVESECRETA, (erro, result) => {
        if(erro){
            return res.json({erro, result, Mensagem: "token expirado"}) 
        }
        const { idUsuario, tipoUsuario} = result
        // req.user = {idUsuario, tipoUsuario}
        if(tipoUsuario !== "professor"){
            return res.json({Mensagem: "Usuario nao autorizado"})
        }
        next()
    } )
}


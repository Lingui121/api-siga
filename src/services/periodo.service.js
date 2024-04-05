import { consulta } from "../database/conexao"

export async function getPeriodos(req, res){
    try{
        const sql = "SELECT *FROM tabelaperiodo"
        const periodos = await consulta(sql)
        return res.json(periodos)
    }catch(erro){
        return res.json(erro)
    }
}

export async function getPeriodo(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT * FROM tabelaperiodo WHERE idPeriodo = ?"
        const periodo1 = (await consulta(sql1, [id]))[0]
        if(!periodo1){
            return res.json({mensagem:"Nao foi Possivel!"})
        }
        const sql = "SELECT *FROM tabelaperiodo WHERE idPeriodo = ?"
        const periodo = (await consulta(sql, [id]))[0]
        return res.json(periodo)
    }catch(erro){
        return res.json(erro)
    }
}

export async function createPeriodo(req, res){
    const {
		periodo
	} = req.body
    try{
        const sql = "INSERT INTO tabelaperiodo set?"
        const periodo = await consulta(sql,[
            {
                periodo
            }
        ])
        return res.json(periodo)
    }catch(erro){
        return res.json(erro)
    }
}

export async function updatePeriodo(req, res){
    const { id } = req.params
    const {
        periodo
    } = req.body

    try{
        const sql1 = "SELECT * FROM tabelaperiodo WHERE idPeriodo = ?"
        const periodo1 = (await consulta(sql1, [id]))[0]
        if(!periodo1){
            return res.json({mensagem:"Nao foi Possivel"})
        }
        const sql = "UPDATE tabelaperiodo SET ? WHERE idPeriodo = ?"
        const periodos = await consulta(sql, [{
            periodo : periodo ? periodo : periodo1.periodo,
        },
        id
    ])
        return res.json(periodos)
    }catch(erro){
        return res.json(erro)
    }
}
export async function deletePeriodo(req, res){
    const { id } = req.params
    try{
        const sql1 = "SELECT *FROM tabelaperiodo WHERE idPeriodo = ?"
        const periodo1 = (await consulta(sql1, [id]))[0]
        if(!periodo1){
            return res.json({Mensagem: "Nao foi Possivel"})
        }
        const sql = "DELETE FROM tabelaperiodo WHERE idPeriodo = ?"
        const periodo = await consulta(sql, [id])
        return res.json(periodo)
    }catch(erro){
        return res.json(erro)
    }
}
